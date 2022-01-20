import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./WelcomeStyle.css";

function WelcomePage() {
  useEffect(() => {
    //////////////////////////////////////// CONNECT TO SOCKET
  }, []);

  return (
    <div className="container">
      <h1 className="welcome">Welcome!</h1>
      <Link className="link" to="/choose">
        <button className="button">Press to start</button>
      </Link>
    </div>
  );
}

export default WelcomePage;
