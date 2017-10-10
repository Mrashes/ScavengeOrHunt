import React from "react";
import { Link } from "react-router-dom";

export const FormBtn = props =>
    <Link{...props} >
        {props.children}
    </Link>;
