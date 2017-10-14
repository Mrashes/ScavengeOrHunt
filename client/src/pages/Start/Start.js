import React, { Component } from 'react';
import { Input, FormBtn } from "../../components/Form";
import Header from "../../components/Header";
import Wrapper from "../../components/Wrapper";
import "./Start.css";

class Start extends Component {
  state = {
    username: "",
    gameId: ""
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

  render() {
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
            to="/game"
            params={{username: this.state.username, gameId: this.state.gameId}}
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