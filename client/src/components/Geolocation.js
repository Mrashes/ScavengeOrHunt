import React, { Component } from 'react';

class Geolocation extends Component {
    state = {
        currLat: 0,
        currLon: 0,
        destLat: 0,
        destLon: 0
    }

    componentDidMount() {
        this.getCurrentLocation();
        this.getDestinationLocation();
    }

    compareLocations = () => {
        if (this.state.currLat === this.state.destLat && this.state.currLon === this.state.destLon) {
            //Launch Aframe
            console.log('Aframe launch')
        }
        else {
            //Respond with arrow to point (?)
        }
    }

    setCurrLatLon = (lat, lon) =>{
        const currlat = Math.round(10000*lat)/10000;
        const currlon = Math.round(10000*lon)/10000;
        this.setState({
            currLat: currlat,
            currLon: currlon
        });
    }

    getDestinationLocation = () => {
        //Ajax for Destination data
        //fornow
        // Math rounds to 5 decimals
        const homelat = Math.round(10000*41.89333)/10000;
        const homelon = Math.round(10000*-87.78125)/10000;
        this.setState({
            destLat: homelat,
            destLon: homelon
        });
    }

    getCurrentLocation = () => {
        function geo_success(position) {
            this.setCurrLatLon(position.coords.latitude, position.coords.longitude);
            this.compareLocations()
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
        return(
            <div>
                <p>Current Coords</p>
                <p>{this.state.currLat}</p>
                <p>{this.state.currLon}</p>
                <p>Destination</p>
                <p>{this.state.destLat}</p>
                <p>{this.state.destLon}</p>
            </div>
        )
    }
}

export default Geolocation;
