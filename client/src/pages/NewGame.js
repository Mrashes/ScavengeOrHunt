import React, {Component} from "react"
import API from "../utils/API"

class NewGame extends Component {
    state = {
        game: {
                gameid: "",
                locations: [{
                    locationNum: "",
                    clue: "",
                    latitude: "",
                    longitude: "",
                    hitcounter: (Math.floor(Math.random()*5))+1
                }]
        },
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
        event.preventDefault();
        let game = this.state.game
        let locations = this.state.game.locations
        this.setState({game: {...game, 
                                locations: locations.concat([{
                                                            locationNum: "", 
                                                            clue: "", 
                                                            latitude: "", 
                                                            longitude: "",
                                                            hitcounter: (Math.floor(Math.random()*5))+1}])}, 
        })

    }

    handleSubmit = event => {
        event.preventDefault()
        API.saveGame(this.state.game)
        .then(res => this.setState({game: {...this.state.game, gameid: "", 
                                                locations: [{locationNum: "", clue: "", latitude: "", longitude: ""}]}}))
        .catch(err => console.log(err))
    }

    render(){
        let game = this.state.game
        return(
            <div>
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
                            <label htmlFor="locationNum">LocationNumber</label>
                            <input 
                                type="number"
                                value={location.locationNum}
                                onChange={this.handleInputChange(index)}
                                name="locationNum"
                                placeholder="Enter the Location Number (required)"
                            />
                            
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
                    <button onClick = {this.handleAdd}>
                        Add Location
                    </button>  
                    <button onClick = {this.handleSubmit}>
                        Submit
                    </button>                                                        
                </form>
            </div>
        )
    }
}

export default NewGame;