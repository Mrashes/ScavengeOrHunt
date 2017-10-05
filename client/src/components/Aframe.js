import React, { Component } from 'react';
import './aframe.css';
import 'aframe';
// import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
//https://github.com/ngokevin/aframe-react

class Aframe extends Component {

    state = {
        color: 'red',
        counter: 0
    }

    changeColor = () => {
        // const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
        this.setState({
            // color: colors[Math.floor(Math.random() * colors.length)],
            counter: this.state.counter += 1
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
                <Scene events={{click: this.changeColor.bind(this)}}>

                    <Entity text={{value: "clicks: " + this.state.counter, align: 'center'}} position={{x: 0, y: 1.5, z: -1}}/>

                    <Entity id="box"
                        geometry={{primitive: 'box'}}
                        material={{color: this.state.color, opacity: 0.6}}
                        animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
                        animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
                        position={{x: 0, y: 3, z: -3}}
                        events={{click: this.changeColor.bind(this)}}>
                        
                        <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                            geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                            material={{color: '#24CAFF'}}/>

                    </Entity>
                </Scene>
                <video></video>
            </div>
        )
    }
}

export default Aframe;
