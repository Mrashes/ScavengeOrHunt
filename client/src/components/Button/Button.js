import React from "react";
import "./Button.css";

const Button = props => 
    <button className="btn btn-success" {...props}>
        {props.children}
    </button>;

export default Button;