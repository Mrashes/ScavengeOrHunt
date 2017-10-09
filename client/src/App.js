import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Aframe from './components/Aframe';
import Game from './pages/Game';
import NewGame from './pages/NewGame';

const App = () => 
    <Router>
        <div>
        <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/aframe" component={Aframe} />
            <Route exact path="/newgame" component={NewGame} />
        </Switch>
        </div>
    </Router>;


export default App;
