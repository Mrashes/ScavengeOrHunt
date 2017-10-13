import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
import Aframe from './Aframe.js'
import API from '../utils/API.js'

//TODO play sound when you reached the area - 1
//TODO make range of degrees it can be - 2
//TODO Only spawn shapes to the side of you - 3
//TODO Play sound on "click" of object - 4
//TODO Aframe animations - 5

//Amanda passed data
//this.props.params.username
//this.props.params.gameid

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
        redirect: false,
        endRedirect: false
    }

    componentDidMount() {
        this.getCurrentLocation();
        this.getGameInfo();
    }


    //REDIRECT FUNCTIONS
    
    same = () => {
        this.setState({
            redirect: true,
            turn: this.state.turn+1,
        })
    }

    // same = () => {
    //     var audio = new Audio('./audio/locationAlert.mp3');
    //     console.log(audio)
    //     audio.play();
    // }

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
            var audio = new Audio('./audio/locationAlert.mp3');
            audio.play();
            console.log(audio)

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

    setCurrLatLon = (lat, lon) =>{
        return new Promise (
            (resolve, reject) => {
                const currlat = Math.round(10000*lat)/10000;
                const currlon = Math.round(10000*lon)/10000;
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
        API.getGame("MaxTest").then(res => {
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
    
            const destlat = Math.round(10000*lat)/10000;
            const destlon = Math.round(10000*lon)/10000;
    
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

    timeCompare = () => {
        const endTime = new Date();
        const timeDiff = endTime - this.state.startTime
        const score = new Date(timeDiff)
        this.setState({
            time: score.getUTCHours() + ':' + score.getUTCMinutes() + ':' + score.getUTCSeconds(),
            endRedirect: true
        })
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
                <div>
                    <p>You did it!!!  Congrats!!!!</p>
                    <p>Your time was {this.state.time}</p>
                </div>
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

                <p>Hint</p>
                <p>{this.state.destHint}</p>

                <p>Turn</p>
                <p>{this.state.turn}</p>

                <button onClick={this.same}>Make the same</button>
            </div>
        )        
    }
}

export default PlayGame;
