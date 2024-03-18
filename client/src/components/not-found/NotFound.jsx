import React from "react";
import { Link } from "react-router-dom";
import Path from "../../../paths.js";

export const NotFound = () => {
    return (

        <div className="main">
          <img src="/public/images/road1.jpeg" alt="" />
          <div className="centered-text">
            <p>404 | OOPS!</p>
            <h1>We made a wrong turn.</h1>
            <h4>Not to worry. You can <Link to='/'>visit the homepage</Link> or use the main menu above to find your way.</h4>
          </div>
        </div>
      );
}