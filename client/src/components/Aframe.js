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
        end: false,
        boxPosition: {'id':0, 'x': 0, 'y': 3, 'z': -3},
        wordPosition: {'x': 0, 'y': 1.5, 'z': -1},
        wordRotation: {'x':0, 'y':0, 'z':0}
    }

    componentDidMount() {
        this.makeCamera()
    }

    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    counterIncrement = () => {
        this.setState({
            counter: this.state.counter + 1
        });
        const counter = this.state.counter
        if (counter == 1) {
            //move to another side
            this.moveBox()
        }
        if (this.state.counter >= 1) {
            this.stopIt()
        }
    }

    moveBox = () => {
        const boxPosList = [{'id':0, 'x': 0, 'y': 3, 'z': -3}, {'id':1, 'x': -3, 'y': 3, 'z': 0}, {'id':2, 'x': 0, 'y': 3, 'z': 3}, {'id':3, 'x': 3, 'y': 3, 'z': 0}]
        const boxPosition = this.state.boxPosition
        
        const movedBox = boxPosList.filter(object => object["id"] !== boxPosition["id"])

        console.log(movedBox)

        // const index = this.getRandomInt(0, boxPosList.length)
        // this.setState({
        //     boxPosition: boxPosList[index]
        // });
        // this.moveWords(index)
    }

    moveWords = (index) => {
        const wordPosList = [{x: 0, y: 1.5, z: -1}, {x: -1, y: 1.5, z: 0}, {x: 0, y: 1.5, z: 1}, {x: 1, y: 1.5, z: 0}]
        this.setState({
            wordPosition: wordPosList[index]
        });
        this.rotateWords(index)
    }

    rotateWords = (index) => {
        const wordRotList = [{x: 0, y: 0, z: 0}, {x: 0, y: 90, z: 0}, {x: 0, y: 180, z: 0}, {x: 0, y: 270, z: 0}]
        this.setState({
            wordRotation: wordRotList[index]
        }); 
    }

    stopIt = () => {
        // Show Win screen
        this.setState({
            counter: 0,
            end: true
        });
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
        return(
            //https://github.com/ngokevin/aframe-react-boilerplate/blob/master/src/index.js
            <div>
                <Scene>
                    
                    {/* <Entity primitive="a-sky" transparent="true"/> */}
                    {/* <Entity primitive="a-plane" transparent="true"/> */}

                    <Entity id="box"
                        geometry={{primitive: 'box'}}
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
