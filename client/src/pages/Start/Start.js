import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import { Input, FormBtn } from "../../components/Form";
import API from "../../utils/API"
import "./Start.css";

const GAMEIDERROR = "Game ID does not exist, Please enter a valid Game ID"

class Start extends Component {
  state = {
    username: "",
    gameId: "",
    redirect: false,
    errtextId: false,
    routeObj: {},
    allgames: [],
  }

  componentDidMount = () => {
    API.getAllGames()
    .then(res => this.setState({allgames: res.data.map((game, i) => game.gameid)}))
    .catch(err => console.log(err))
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    //event.preventDefault();
  };

  isGameidExists = () =>{
    const curgameid = this.state.gameId.trim();
    //let routeObj={}
    console.log("test")
 
    if(this.state.allgames.includes(curgameid)){
        this.setState({routeObj: {
          pathname: '/game',
          state: {username: this.state.username, gameId: this.state.gameId}}, 
          errtextId: false, redirect: true})
    }
    else{
      
      this.setState({routeObj: {pathname: '/start'}, errtextId: true, redirect: false})
    }
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: this.state.routeObj.pathname,
        state: this.state.routeObj.state 
      }}/>)
    }
    return (
      <Wrapper>
        <Header>
          <div>Scavenge</div>
          <div>Or</div>
          <div>Hunt</div>
        </Header>
        <p>{this.state.errtextId ? GAMEIDERROR : ""}</p>
        <form>
          <Input
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            placeholder="Username (required)"
            htmlFor = "username"
            label = "Username"
          />

          <Input
            value={this.state.gameId}
            onChange={this.handleInputChange}
            name="gameId"
            placeholder="Game Id (required)"
            htmlFor = "gameid"
            label = "Game ID"
          />
          
          <FormBtn
            className="btn btn-success"
            role="button"
            onClick={this.isGameidExists}
            to={{pathname: '/start'}}
            disabled={!(this.state.username && this.state.gameId)}
          >
            Start Hunt
          </FormBtn>
        </form>
        <FormBtn 
            className="btn btn-success"
            role="button"
            to="/"
        >
            Home
        </FormBtn>
      </Wrapper>
    );
  }
}

export default Start;