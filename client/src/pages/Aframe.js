import React, { Component } from 'react';
import './aframe.css';

import 'aframe';
import 'aframe-animation-component';
import {Entity, Scene} from 'aframe-react';

// import { Redirect } from "react-router-dom";

//https://github.com/ngokevin/aframe-react

//note localtunnel.me -- use for phone testing

class Aframe extends Component {

    state = {
        color: 'red',
        shape: 'box',
        counter: 0,
        counterTarget: this.props.targetClicks,
        boxPosition: {'id':0, 'x': 0, 'y': 3, 'z': -3},
        reticle: ""
        // wordPosition: {'x': 0, 'y': 1.5, 'z': -1},
        // wordRotation: {'x':0, 'y':0, 'z':0}
    }

    componentDidMount() {
        this.makeCamera()
        this.changeShapeProperties()
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    // createReticle = () => {
        
    //     this.setState({
    //         reticle: {primitive: "reticle"}
    //     })
    // }

    counterIncrement = () => {
        this.setState({
            counter: this.state.counter + 1
        });
        const counter = this.state.counter
        //move to another side
        this.moveBox()
        if (counter === this.state.counterTarget) {
            //reset counter to 0
            this.stopIt()
        }
        // if (this.state.counter >= 1) {
        //     this.stopIt()
        // }
    }

    changeShapeProperties = () => {
        const shape = ['box','cone','cylinder','sphere','ring','torus'];
        const color = ['red', 'orange', 'yellow', 'green', 'blue'];
        const randomShape = this.getRandomInt(0, shape.length-1);
        const randomColor = this.getRandomInt(0, color.length-1);
        this.setState({
            shape: shape[randomShape],
            color: color[randomColor]
        })
    }

    moveBox = () => {
        const boxPosList = [{'id':0, 'x': 0, 'y': 3, 'z': -3}, {'id':1, 'x': -3, 'y': 3, 'z': 0}, {'id':2, 'x': 0, 'y': 3, 'z': 3}, {'id':3, 'x': 3, 'y': 3, 'z': 0}]
        const boxPosition = this.state.boxPosition
        const boxListMinusCurr = boxPosList.filter(object => object["id"] !== boxPosition["id"])
        const index = this.getRandomInt(0, boxListMinusCurr.length)
        this.setState({
            boxPosition: boxListMinusCurr[index]
        });
    }

    stopIt = () => {
        // Show Win screen
        this.props.destination()
        this.props.redirect()
    }

    makeCamera = () => {
        // facingMode environment means it'll prefer the back camera if available
        const constraints = { video: { facingMode:{exact:"environment"} } };
        
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(mediaStream) {
                var video = document.querySelector('video');
                video.srcObject = mediaStream;
                video.onloadedmetadata = function(e) {
                    video.play();
                };
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message); 
            }); // always check for errors at the end.
    }

    render() {
        // if (this.state.redirect) {
        //     return (<Redirect push to="/start" />)
        // }

        return(
            //https://github.com/ngokevin/aframe-react-boilerplate/blob/master/src/index.js
            <div>
                <Scene>
                    
                    {/* <Entity primitive="a-sky" transparent="true"/> */}
                    {/* <Entity primitive="a-plane" transparent="true"/> */}

                    <Entity id="box"
                        geometry={{primitive: this.state.shape}}
                        material={{color: this.state.color, opacity: 0.6}}
                        animation__rotate={{property: 'rotation', dur: 5000, easing: 'easeInOutSine', restartEvents: "click", to: '360 360 360'}}
                        position={this.state.boxPosition}
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
                            geometry={this.state.reticle}
                            animation__click={{
                                property: 'scale', 
                                restartEvents: "click",
                                from: '0.1 0.1 0.1', 
                                to: '1 1 1', 
                                dur: 150
                            }}
                        />
                    </Entity>

                </Scene>

                <p className="clicks">clicks: {this.state.counter}</p>

                <video className="unselectable"></video>
            </div>
        )
    }
}

export default Aframe;
