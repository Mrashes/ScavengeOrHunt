import React, { Component } from 'react';
import { Input, FormBtn } from "../components/Form";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import "./Start.css";

class Start extends Component {
  state = {
    username: "",
    gameId: "",
    redirect: false
  }

  handleStartGame = username => {
    this.setState({ username: username, score: 0 })
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    //event.preventDefault();
  };

  render() {
    // if (this.state.redirect) {
    //   return (<Redirect to={{
    //     pathname: '/login',
    //     state: { referrer: currentLocation }
    //   }}/>)
    // }
    return (
      <Wrapper>
        <Header>
          <div>Scavenge</div>
          <div>Or</div>
          <div>Hunt</div>
        </Header>
        <form>
          <Input
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            placeholder="Username (required)"
          />

          <Input
            value={this.state.gameId}
            onChange={this.handleInputChange}
            name="gameId"
            placeholder="Game Id (required)"
          />
          
          <FormBtn
            className="btn btn-success"
            role="button"
            to={{
              pathname: '/game',
              state: {username: this.state.username, gameId: this.state.gameId}
            }}
            disabled={!(this.state.username)}
          >
            Start Hunt
          </FormBtn>
        </form>
      </Wrapper>
    );
  }
}

export default Start;