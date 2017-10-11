import React, { Component } from 'react';
// import { Redirect } from "react-router-dom";
import Aframe from './Aframe.js'
import API from '../utils/API.js'

import axios from 'axios'

class PlayGame extends Component {
    state = {
        currLat: 0,
        currLon: 0,
        locations: {},
        destLat: 0,
        destLon: 0,
        destHint: "",
        destClick: 0,
        turn: 1,
        redirect: false,
    }

    flatdata = {
        "_id": "59dd50b1a0ed6b09cc538f8d",
        "gameid": "MaxTest",
        "__v": 0,
        "locations": [
            {
            "locationNum": 1,
            "clue": "School",
            "latitude": "41.896763",
            "longitude": "-87.618765",
            "_id": "59dd50b1a0ed6b09cc538f93",
            "hitcounter": 3
            },
            {
            "locationNum": 2,
            "clue": "Modern Art",
            "latitude": "41.897219",
            "longitude": "-87.621640",
            "_id": "59dd50b1a0ed6b09cc538f92",
            "hitcounter": 3
            },
            {
            "locationNum": 3,
            "clue": "Water Tower",
            "latitude": "41.897165",
            "longitude": "-87.624567",
            "_id": "59dd50b1a0ed6b09cc538f91",
            "hitcounter": 2
            },
            {
            "locationNum": 4,
            "clue": "Driehaus",
            "latitude": "41.894346",
            "longitude": "-87.626708",
            "_id": "59dd50b1a0ed6b09cc538f90",
            "hitcounter": 0
            },
            {
            "locationNum": 5,
            "clue": "InterContinental",
            "latitude": "41.891395",
            "longitude": "-87.623934",
            "_id": "59dd50b1a0ed6b09cc538f8f",
            "hitcounter": 3
            },
            {
            "locationNum": 6,
            "clue": "Pioneer court",
            "latitude": "41.890068",
            "longitude": "-87.623594",
            "_id": "59dd50b1a0ed6b09cc538f8e",
            "hitcounter": 4
            }
        ]
    }

    componentDidMount() {
        this.getCurrentLocation();
        this.getGameInfo();
    }

    compareLocations = () => {
        // console.log('it compared')

        //if location comparison correct then display the aframe environment
        if (this.state.currLat === this.state.destLat && this.state.currLon === this.state.destLon) {
            // console.log('link to aframe')
            this.setState({
                turn: this.state.turn+1,
            })
            if (this.state.turn >= this.state.locations.length){
                console.log("End game")
            }
            else {
                this.setState({
                    redirect: true
                })
            }
            // console.log(this.state.turn)
        }
        else {
            //Keep going
        }
    }

    handleRedirect = () => {
        this.setState({
            redirect: false
        })
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

    same = () => {
        var currLon = this.state.currLon
        var currLat = this.state.currLat
        this.setState({
            destLat: currLat,
            destLon: currLon
        });
        this.compareLocations()
    }

    getGameInfo = () => {
        //Ajax for Destination data
        API.getGame("MaxTest").then(res => {
            this.setState({
                locations: res.data[0].locations
            })
            // console.log(this.state.locations)
            this.getDestinationLocation()
        })
        // axios.get("/api/game/").then(res => {
        //     this.setState({
        //         locations: this.flatdata.locations
        //     })
        //     console.log(this.state.locations)
        //     this.getDestinationLocation()
        // })
        //for now
    }

    getDestinationLocation = () => {
        const lat = this.state.locations[this.state.turn-1].latitude
        const lon = this.state.locations[this.state.turn-1].longitude
        const destlat = Math.round(10000*lat)/10000;
        const destlon = Math.round(10000*lon)/10000;
        this.setState({
            destLat: destlat,
            destLon: destlon,
            destHint: this.state.locations[this.state.turn].clue,
            destClick: this.state.locations[this.state.turn].hitcounter
        });
    }

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
        
        navigator.geolocation.watchPosition(geo_success.bind(this), geo_error, geo_options);
    }

    render() {
        if (this.state.redirect) {
            return (<Aframe 
                        destination={this.getDestinationLocation} 
                        redirect={this.handleRedirect}
                        targetClicks={this.state.destClick}/>)
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
