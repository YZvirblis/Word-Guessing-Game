import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function WelcomePage() {
  useEffect(() => {
    //////////////////////////////////////// CONNECT TO SOCKET
  }, []);

  return (
    <div className="container">
      <h1 className="welcome-title">Welcome!</h1>
      <Link className="link" to="/choose">
        <button className="button">Press to start</button>
      </Link>
    </div>
  );
}

export default WelcomePage;
