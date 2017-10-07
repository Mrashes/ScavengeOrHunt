import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Aframe from './components/Aframe';
import Game from './pages/Game';

const App = () => 
    <Router>
        <div>
        <Switch>
            <Route exact path="/" component={Game} />
            <Route exact path="/aframe" component={Aframe} />
        </Switch>
        </div>
    </Router>;


export default App;
