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

    setCurrLatLon = (lat, lon) =>{
        this.setState({
            currLat: lat,
            currLon: lon
        });
    }

    getDestinationLocation = () => {
        //Ajax for Destination data
        //fornow
        this.setState({
            destLat: 0,
            destLon: 0
        });
    }

    getCurrentLocation = () => {
        function geo_success(position) {
            this.setCurrLatLon(position.coords.latitude, position.coords.longitude);
            if (this.state.currLat === this.state.destLat){
                if (this.state.currLon === this.state.destLon){
                    //They both match so do the thing
                }
            }
        }
        
        function geo_error() {
            console.log("Sorry, no position available.");
        }
        
        var geo_options = {
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
