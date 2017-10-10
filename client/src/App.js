import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Aframe from './pages/Aframe';
import Game from './pages/Game';
import PlayGame from './pages/PlayGame'
import NewGame from './pages/NewGame';

const App = () => 
    <Router>
        <div className="App">
        <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/start" component={PlayGame} />
            <Route exact path="/newgame" component={NewGame} />
        </Switch>
        </div>
    </Router>;


export default App;
