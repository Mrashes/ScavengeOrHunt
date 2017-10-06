import React, { Component } from 'react';
import './App.css';
import Aframe from './components/Aframe'
import Geolocation from './components/Geolocation'

class App extends Component {

    render() {
        return(
            <div>
                <Geolocation />
                {/* <Aframe /> */}
            </div>
        )
    }
}

export default App;
