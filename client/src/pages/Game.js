import React, { Component } from 'react';
import { Input, FormBtn } from "../components/Form";
import { Link } from "react-router-dom";
import "./Game.css";

class Start extends Component {
  state = {
    username: "",
    score: 0
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
    return (
      <div>
        <div className="game-name">
          <h1>Scavenge</h1>
          <h1>Or</h1>
          <h1>Hunt</h1> 
        </div>
        <form>
          <Input
            value={this.state.username}
            onChange={this.handleInputChange}
            name="username"
            placeholder="Username (required)"
          />
          
          <FormBtn
            className="btn btn-success"
            role="button"
            to="/start"
            disabled={!(this.state.username)}
          >
            Start Hunt
          </FormBtn>
        </form>
      </div>
    );
  }
}

export default Start;