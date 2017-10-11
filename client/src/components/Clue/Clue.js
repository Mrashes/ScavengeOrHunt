import React from "react";
import "./Clue.css";
import Button from "../Button";

const Clue = props => 
    <div class="panel panel-default">
        <div class="panel-heading">Clue #{props.number}</div>
        <div class="panel-body">{props.hint}</div>
        <Button onClick={props.same}> Skip To Location </Button>
    </div>;

export default Clue;