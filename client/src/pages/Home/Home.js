import React, { Component } from 'react';
import { Link } from "react-router-dom";

const Home = () => 
    <div>
        <h1>Scavenge Or Hunt</h1>
        <Link to="/">CREATE</Link>
        <Link to="/Game">PLAY</Link>
    </div>


export default Home;