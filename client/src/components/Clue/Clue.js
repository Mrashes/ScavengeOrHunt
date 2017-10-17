import React from "react";
import "./Clue.css";
import Button from "../Button";
import Wrapper from "../Wrapper";

const Clue = props => 
    <div className="clue-wrapper">
        <div className="inner">
        <h1>Clue #{props.number}</h1>
        <p>{props.hint}</p>
        {
            (props.gameId.endsWith('Test')) ? 
                (<Button onClick={props.same}> Skip To Location </Button>) : ("")
        }
        </div>
    </div>;

export default Clue;