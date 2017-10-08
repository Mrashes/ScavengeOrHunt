import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Aframe from './pages/Aframe';
import Game from './pages/Game';
import PlayGame from './pages/PlayGame'

const App = () => 
    <Router>
        <div>
        <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/start" component={PlayGame} />
            <Route exact path="/aframe" component={Aframe} />
        </Switch>
        </div>
    </Router>;


export default App;
