import React, { Component } from 'react';
import { Input, FormBtn } from "../../components/Form";
import { Link } from "react-router-dom";

class Game extends Component {
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
        <h1 className="game-name">Scavenge Or Hunt</h1>
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
                to="/aframe"
                disabled={!(this.state.username)}
              >
                Start Hunt
              </FormBtn>
              
              
          </form>
      </div>
    );
  }
}

export default Game;