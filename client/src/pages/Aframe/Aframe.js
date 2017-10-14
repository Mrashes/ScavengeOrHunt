import React, { Component } from 'react';
import './Aframe.css';
import 'aframe';
import 'aframe-animation-component';
import {Entity, Scene} from 'aframe-react';
import ShootSound from './../audio/shootSound.mp3'

//https://github.com/ngokevin/aframe-react

class Aframe extends Component {

    state = {
        color: 'red',
        shape: 'box',
        counter: 0,
        counterTarget: this.props.targetClicks,
        boxPosition: {'id':0, 'x': 0, 'y': 3, 'z': -3},
        // reticle: ""
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

    //increment the counter at the top and move the box
    counterIncrement = () => {
        this.setState({
            counter: this.state.counter + 1
        });
        const counter = this.state.counter

        var audio = new Audio(ShootSound)
        audio.play();

        //move to another side
        this.moveBox()
        if (counter === this.state.counterTarget) {
            //reset counter to 0
            this.stopIt()
        }
    }

    //Randomize how the shape looks
    changeShapeProperties = () => {
        const shape = ['box','cone','cylinder','sphere', 'torus'];
        const color = ['red', 'orange', 'yellow', 'green', 'blue'];
        const randomShape = this.getRandomInt(0, shape.length-1);
        const randomColor = this.getRandomInt(0, color.length-1);
        this.setState({
            shape: shape[randomShape],
            color: color[randomColor]
        })
    }

    //this bascially handles the shit
    boxEdgeCase = (boxList, boxPos) =>  {
        //if id is zero find the biggest id
        if (boxPos["id"] === 0) {
            return boxList.length-1
        }
        //if id is biggest return zero
        else if (boxPos["id"] === boxList.length-1) {
            return 0
        }
        //if zero return the second biggest number
        else if (boxPos["id"] === 1) {
            return boxList.length-2
        }
        else {
            return boxPos['id'] - 2
        }
    }
    
    //This sucks
    moveBox = () => {
        //list of all locations of box
        const boxPosList = [{'id':0, 'x': 0, 'y': 3, 'z': -3}, {'id':1, 'x': -3, 'y': 3, 'z': 0}, {'id':2, 'x': 0, 'y': 3, 'z': 3}, {'id':3, 'x': 3, 'y': 3, 'z': 0}]
        //current state of box
        const boxPosition = this.state.boxPosition
        //filter out current location
        const newBox = boxPosList.filter(object => object["id"] !== boxPosition["id"])
        //find what object is the edgecase
        const forbidden = this.boxEdgeCase(boxPosList, boxPosition)
        //filter out the edge case
        const nextBox = newBox.filter(object => object["id"] !== forbidden) 
        // find the index
        const index = this.getRandomInt(0, nextBox.length)
        this.setState({
            boxPosition: nextBox[index]
        });
    }

    //this finishes the aframe game
    stopIt = () => {
        // this.props.destination()
        this.props.redirect()
    }

    //This builds the camera in the background
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
                    <Entity id="box"
                        geometry={{primitive: this.state.shape}}
                        material={{color: this.state.color, opacity: 0.6}}
                        animation__rotate={{property: 'rotation', dur: 5000, easing: 'easeInOutSine', loop: true, to: '360 360 360'}}
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
                        />
                    </Entity>

                </Scene>

                <audio ref="shoot" src={ShootSound} preload></audio>

                <p className="clicks">clicks: {this.state.counter}</p>

                <video className="unselectable"></video>
            </div>
        )
    }
}

export default Aframe;
