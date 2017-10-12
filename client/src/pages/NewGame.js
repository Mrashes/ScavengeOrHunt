import React, {Component} from "react"
import API from "../utils/API"
import Button from "../components/Button"
import {Input} from "../components/Form"
import Wrapper from "../components/Wrapper"

const GAMEIDERROR = "Game ID Exists or Blank, Please enter a valid Game ID"
const BLANKFIELDERROR = "Fields cannot be blank, Please enter valid values"

class NewGame extends Component {
    state = {
        allgames: [],
        errtextId: false,
        errtextEmpty: false,
        game: {
                gameid: "",
                locations: [{
                    clue: "",
                    latitude: "",
                    longitude: "",
                    hitcounter: (Math.floor(Math.random()*5))+1
                }]
        },
    }

    componentWillMount = () => {
        API.getAllGames()
        .then(res => this.setState({allgames: res.data.map((game, i) => game.gameid)}))
        .catch(err => console.log(err))
    }

    handleGameIdChange = event => {
        const {name, value} = event.target;
        this.setState({game: {...this.state.game, [name]: value}})
    }  

    handleInputChange = (index) => event => {
        const newLocation = this.state.game.locations.map((location, i) => {
            if(i!==index)
                return location
            else{
                const {name, value} = event.target;
                return {...location, [name]: value}
            }                
        })

        this.setState({game: {...this.state.game, locations: newLocation}})

    }  
    
    handleAdd = event => {
        console.log("gameids", this.state.allgames)
        event.preventDefault();
        let game = this.state.game
        let locations = this.state.game.locations
        if(!this.isGameidExists() && !this.isEmpty()){
            console.log("not empty")
            this.setState({game: {...game, 
                                    locations: locations.concat([{
                                                                clue: "", 
                                                                latitude: "", 
                                                                longitude: "",
                                                                hitcounter: (Math.floor(Math.random()*5))+1}])}, 
            })
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        if(!this.isGameidExists() && !this.isEmpty()){

            API.saveGame(this.state.game)
            .then(res => this.setState({game: {...this.state.game, gameid: "", 
                                                    locations: [{clue: "", latitude: "", longitude: ""}]}}))
            .catch(err => console.log(err))
        }
    }

    isGameidExists = () =>{
        const curgameid = this.state.game.gameid.trim();
        let isGameid=false;
        if(this.state.allgames.includes(curgameid) || curgameid===""){
            isGameid=true;
        }
        this.setState({errtextId: isGameid})
        return isGameid;
    }

    isEmpty = () => {
        const curlocations = this.state.game.locations;
        let isBlank = false;
        curlocations.map((location, i) => {
            if(location.clue==="" || location.latitude==="" || location.longitude===""){
                isBlank=true;
            }
        })
        this.setState({errtextEmpty: isBlank})
        return isBlank;
    }

    render(){
        let game = this.state.game
        return(
            <Wrapper>
                <p>{this.state.errtextId ? GAMEIDERROR : ""}</p>
                <p>{this.state.errtextEmpty ? BLANKFIELDERROR : ""}</p>
                <form>
                    <label htmlFor="gameid">GameID</label>
                    <input 
                            type="text"
                            value={game.gameid}
                            onChange={this.handleGameIdChange}
                            name="gameid"
                            placeholder="Enter a Game ID (required)"
                    />                    
                    {game.locations.map((location, index) => (
                        <div key={index}>
                            <label htmlFor="locationNum">Location: {index+1}</label>
                            
                            <label htmlFor="clue">Clue</label> 
                            <input 
                                type="text"
                                value={location.clue}
                                onChange={this.handleInputChange(index)}
                                name="clue"
                                placeholder="Enter the Clue to identify this location (required)"
                            /> 

                            <label htmlFor="latitude">Latitude</label>   
                            <input 
                                type="number"
                                value={location.latitude}
                                onChange={this.handleInputChange(index)}
                                name="latitude"
                                placeholder="Enter the latitude for this location (required from 2nd location onwards)"
                            /> 

                            <label htmlFor="longitude">Longitude</label>   
                            <input 
                                type="number"
                                value={location.longitude}
                                onChange={this.handleInputChange(index)}
                                name="longitude"
                                placeholder="Enter the longitude for this location (required from 2nd location onwards)"
                            />  
                        </div>
                    ))}                         
                    <Button onClick = {this.handleAdd}>
                        Add Location
                    </Button>  
                    <Button onClick = {this.handleSubmit}>
                        Submit
                    </Button>                                                        
                </form>
            </Wrapper>
        )
    }
}

export default NewGame;