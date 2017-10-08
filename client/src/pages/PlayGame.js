import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

class PlayGame extends Component {
    state = {
        currLat: 0,
        currLon: 0,
        destArray: [],
        destLat: 0,
        destLon: 0,
        turn: 0,
        redirect: false,
        hint: "Where you go to school dummy"
    }

    componentDidMount() {
        this.getCurrentLocation();
        this.getDestinationLocation();
    }

    compareLocations = () => {
        console.log('it compared')

        //if location comparison correct then display the aframe environment
        if (this.state.currLat === this.state.destLat && this.state.currLon === this.state.destLon) {
            console.log('link to aframe')
            this.setState({
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

    same = () => {
        var currLon = this.state.currLon
        var currLat = this.state.currLat
        this.setState({
            destLat: currLat,
            destLon: currLon
        });
        this.compareLocations()
    }

    getDestinationLocation = () => {
        //Ajax for Destination data
        //fornow
        const homelat = Math.round(10000*41.89333)/10000;
        const homelon = Math.round(10000*-87.7820)/10000;
        const hint = "Where you go to school"
        this.setState({
            destLat: homelat,
            destLon: homelon,
            hint: hint
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
            return (<Redirect push to="/aframe" />)
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
                <p>{this.state.hint}</p>

                <button onClick={this.same}>Make the same</button>
            </div>
        )        
    }
}

export default PlayGame;
