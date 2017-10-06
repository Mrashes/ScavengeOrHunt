import React, { Component } from 'react';
import './aframe.css';
import 'aframe';
import 'aframe-animation-component';
import {Entity, Scene} from 'aframe-react';
//https://github.com/ngokevin/aframe-react

//note localtunnel.me -- use for phone testing


class Aframe extends Component {

    state = {
        color: 'red',
        counter: 0,
        end: false
    }

    counterIncrement = () => {
        this.setState({
            counter: this.state.counter + 1
        });
        if (this.state.counter >= 50) {
            this.stopIt()
        }
    }

    stopIt = () => {
        this.setState({
            counter: this.state.counter + 1
        });
    }

    componentDidMount() {
        // Prefer camera resolution nearest to 1280x720.
        var constraints = { video: true, facingMode:"environment" }; 

        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(mediaStream) {
                var video = document.querySelector('video');
                video.srcObject = mediaStream;
                video.onloadedmetadata = function(e) {
                    video.play();
                };
            })
            .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
    }

    render() {
        return(
            //https://github.com/ngokevin/aframe-react-boilerplate/blob/master/src/index.js
            <div>
                <Scene>

                    <Entity text={{value: "clicks: " + this.state.counter, align: 'center'}} position={{x: 0, y: 1.5, z: -1}}/>

                    <Entity id="box"
                        geometry={{primitive: 'box'}}
                        material={{color: this.state.color, opacity: 0.6}}
                        animation__rotate={{property: 'rotation', dur: 5000, loop: true, to: '360 360 360'}}
                        position={{x: 0, y: 3, z: -3}}
                        rotation={{x: 90, y: 90, z: 90}}
                        events={{click: this.counterIncrement}}>
                        
                        <Entity 
                            animation__scale={{
                                property: 'scale', 
                                dir: 'alternate', 
                                dur: 100, 
                                loop: true, 
                                to: '2 2 2'
                            }}
                            geometry={{
                                primitive: 'box', 
                                depth: 0.2, 
                                height: 0.2, 
                                width: 0.2
                            }}
                            material={{color: '#24CAFF'}}/>

                    </Entity>
                    <Entity primitive="a-camera" wasd-controls-enabled="false">
                        <Entity 
                            primitive="a-cursor" 
                            animation__click={{
                                property: 'scale', 
                                startEvents: 'click', 
                                from: '0.1 0.1 0.1', 
                                to: '1 1 1', 
                                dur: 150
                            }}
                        />
                    </Entity>

                </Scene>

                <video className="unselectable"></video>
            </div>
        )
    }
}

export default Aframe;
