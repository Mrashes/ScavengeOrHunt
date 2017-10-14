import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import API from '../../utils/API.js';
import Aframe from '../Aframe';
import Wrapper from '../../components/Wrapper';
import Clue from '../../components/Clue'
import Story from '../../components/Story';
import LocationSound from '../audio/locationAlert.mp3'

//TODO reticle disappering on first shot -- Was linked to animation so I removed the animation
//TODO Aframe animations
    //On shoot
    //On enter
    //On move
//TODO Buy domain
//TODO Move aframe box down

//Amanda passed data
//this.props.location.state.username
//this.props.location.state.gameId

class PlayGame extends Component {
    state = {
        startTime: 0,
        currLat: 0,
        currLon: 0,
        locations: [],
        destLat: 0,
        destLon: 0,
        destHint: "",
        destClick: 0,
        turn: 1,
        leaderData: [],
        redirect: false,
        endRedirect: false,
        new: true,
    }

    componentDidMount() {
        this.getCurrentLocation();
        this.getGameInfo(this.props.location.state.gameId);
    }


    //REDIRECT FUNCTIONS
    
    //Quick resolve for testing
    same = () => {
        this.setState({
            redirect: true,
            turn: this.state.turn+1,
        })
    }
    done = () => {
        this.setState({
            new: false
        })
    }

    //handles redirect from aframe to this
    handleRedirect = () => {
        this.setState({
            redirect: false
        })
    }

    //LOCATION based functions

    compareLocations = () => {
        //if location comparison correct then display the aframe environment
        if (this.state.currLat === this.state.destLat && this.state.currLon === this.state.destLon) {
            //chime to indicate you're there
            var audio = new Audio(LocationSound)
            audio.play();

            //direct to aframe
            this.setState({
                turn: this.state.turn+1,
                redirect: true
            })
        }
        else {
            //Keep going
        }
    }

    //Set current location based on data taken from the watch location function
    setCurrLatLon = (lat, lon) =>{
        return new Promise (
            (resolve, reject) => {
                const currlat = Math.round(1000*lat)/1000;
                const currlon = Math.round(1000*lon)/1000;
                this.setState({
                    currLat: currlat,
                    currLon: currlon
                });
                resolve()
            }
        )
    }

    //AJAX for game data
    getGameInfo = (gameid) => {
        //use gameid instead of  "MaxTest"
        API.getGame(gameid).then(res => {
            this.setState({
                locations: res.data[0].locations
            })
            // console.log(this.state.locations)
            this.getDestinationLocation();
            this.setStartTime();
        })
    }

    //This parses the locations data to return what the next destination is
    getDestinationLocation = () => {
        if (this.state.turn >= this.state.locations.length){
            this.timeCompare()
        }
        else {
            const turn = this.state.turn-1
    
            const lat = this.state.locations[turn].latitude
            const lon = this.state.locations[turn].longitude
    
            const destlat = Math.round(1000*lat)/1000;
            const destlon = Math.round(1000*lon)/1000;
    
            this.setState({
                destLat: destlat,
                destLon: destlon,
                destHint: this.state.locations[turn].clue,
                destClick: this.state.locations[turn].hitcounter
            });
        }
    }

    //sets up a watch for the position
    getCurrentLocation = () => {
        function geo_success(position) {
            this.setCurrLatLon(position.coords.latitude, position.coords.longitude)
                .then(res => this.compareLocations())
                .catch(e=>console.log(e))
        }
        
        function geo_error() {
            console.log("Sorry, no position available.");
        }
        
        const geo_options = {
            enableHighAccuracy: true,
            maximumAge        : Infinity, 
            timeout           : Infinity
        };
        
        //binds this so I can use another function
        navigator.geolocation.watchPosition(geo_success.bind(this), geo_error, geo_options);
    }


    //TIME functions
    setStartTime = () => {
        const startTime = new Date();
        //getTime finds milliseconds
        this.setState({
            startTime: startTime.getTime()
        })
    }

    //This creates a new date based on the difference between the start and the end of their run
    timeCompare = () => {
        const endTime = new Date();
        const timeDiff = endTime - this.state.startTime
        const score = new Date(timeDiff)
        //This post returns the highscore data from your ID then redirects
        this.postHighScore(score).then(res => {
            this.setState({
                leaderData: res,
                endRedirect: true
            })
        })
    }

    //HIGHSCORE functions
    //Post to database the score
    postHighScore = (score) => {
        return new Promise (
            (resolve, reject) => {
                API.saveUserScore({
                name: this.props.location.state.username,
                hours: score.getUTCHours(),
                minutes: score.getUTCMinutes(),
                seconds: score.getUTCSeconds(),
                gameid: this.props.location.state.gameId
                }).then(res => {
                    console.log(res);
                    API.getScoreByGameId(this.props.location.state.gameId)
                    .then(res => resolve(res.data))
                    .catch(e => console.log(e))
                })
                .catch(e => {
                    console.log(e);
                    API.getScoreByGameId(this.props.location.state.gameId)
                    .then(res => resolve(res.data))
                    .catch(e => console.log(e))
                })
            }
        )
    } 


    //RENDER functions
    render() {
        if (this.state.redirect) {
            return (<Aframe 
                        destination={this.getDestinationLocation} 
                        redirect={this.handleRedirect}
                        targetClicks={this.state.destClick}/>)
        }
        else if (this.state.endRedirect){
            return (
                <Redirect to={{
                    pathname: '/endgame',
                    state: { data: this.state.leaderData }
                  }}
                />
                // <div>
                //     <p>You did it!!!  Congrats!!!!</p>
                //     <p>Your time was {this.state.time}</p>
                // </div>
            )
        }
        else if(this.state.new) {
            return (
                <Story 
                    done={this.done}
                />
            )
        }
        return(
            <div>
                <p>Current Coords</p>
                <p>{this.state.currLat}</p>
                <p>{this.state.currLon}</p>

                <p>Destination</p>
                <p>{this.state.destLat}</p>
                <p>{this.state.destLon}</p>

                <Wrapper>
                    <Clue 
                        number={this.state.turn}
                        hint={this.state.destHint}
                        same={this.same}
                    />
                </Wrapper>
            </div>
            
        )        
    }
}

export default PlayGame;
