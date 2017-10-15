import React, { Component } from 'react';
import './Aframe.css';
import 'aframe';
import 'aframe-animation-component';
import {Entity, Scene} from 'aframe-react';
// import ShootSound from './../audio/shootSound.mp3'
import carModel from '../../media/flyingCar/model.obj'
import carMaterial from '../../media/flyingCar/materials.mtl'
import penguinModel from '../../media/Penguin/model.obj'
import penguinMaterial from '../../media/Penguin/materials.mtl'

//https://github.com/ngokevin/aframe-react

class Aframe extends Component {

    state = {
        color: 'red',
        shape: 'box',
        counter: 0,
        counterTarget: this.props.targetClicks,
        boxPosition: {'id':0, 'x': 0, 'y': 2, 'z': -3},
        // reticle: ""
    }

    componentDidMount() {
        this.makeCamera()
        this.changeShapeProperties()
        this.props.destination()
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

        //This vibrates indicating you hit it
        window.navigator.vibrate(200);

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
        const boxPosList = [{'id':0, 'x': 0, 'y': 2, 'z': -3}, {'id':1, 'x': -3, 'y': 2, 'z': 0}, {'id':2, 'x': 0, 'y': 2, 'z': 3}, {'id':3, 'x': 3, 'y': 2, 'z': 0}]
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
                    <a-assets>
                        <a-asset-item id="ship-obj" src={carModel}></a-asset-item>
                        <a-asset-item id="ship-mtl" src={carMaterial}></a-asset-item>
                        <a-asset-item id="penguin-obj" src={penguinModel}></a-asset-item>
                        <a-asset-item id="penguin-mtl" src={penguinMaterial}></a-asset-item>
                    </a-assets>

                    <Entity id="ship"
                        obj-model="obj: #ship-obj; mtl: #ship-mtl"
                        position={{'id':0, 'x': 3, 'y': 1.5, 'z': 0}}
                        animation__moveToNew={{
                                property: 'position', 
                                dir: 'alternate', 
                                dur: 1000, 
                                loop: true,
                                from:this.position,
                                to: {'id':0, 'x': 0, 'y': 1.5, 'z': 3}
                            }}
                        >


{/* attribute="position" from="1 1 1" to="2 4 -8" */}
                        <Entity 
                            obj-model="obj: #penguin-obj; mtl: #penguin-mtl"
                            scale={{'x':.5,  'y':.5, 'z':.5}}
                            rotation={{'x':0, 'y':90, 'z':0}}
                            position={{'x':0, 'y':0.038, 'z':0.038}} 
                            />

                            

                    </Entity>

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

                    {/* wasd-controls-enabled="false" */}

                    <Entity primitive="a-camera">
                        <Entity 
                            primitive="a-cursor" 
                        />
                    </Entity>

                </Scene>

                <p className="clicks">HITS: {this.state.counter}</p>

                <video className="unselectable"></video>
            </div>
        )
    }
}

export default Aframe;
