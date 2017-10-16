import React from "react";
import "./Clue.css";
import Button from "../Button";
import Wrapper from "../Wrapper";

const Clue = props => 
    <div className="panel panel-default">
        <div className="panel-heading">Clue #{props.number}</div>
        <div className="panel-body">{props.hint}</div>
        {
            (props.gameId.endsWith('Test')) ? 
                (<Button onClick={props.same}> Skip To Location </Button>) : ("")
        }
    </div>;

export default Clue;