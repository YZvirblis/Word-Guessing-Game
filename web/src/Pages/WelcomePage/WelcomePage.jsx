import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import socketController from "../../tools/SocketIO";

function WelcomePage(params) {
  const [isPlayerJoined, setIsPlayerJoined] = useState(false);
  useEffect(() => {
    socketController.connect(params.room);
    socketController.listenJoin(setIsPlayerJoined);
  }, []);

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className="container">
      <h1 className="welcome-title">Welcome!</h1>
      <p className="welcome-subtitle">Send this link to your friend:</p>
      <Link
        className="link"
        to={{ pathname: `/wait/?room=${params.room}` }}
        target="_blank"
      >
        <p className="welcome-link">
          http://localhost:3000/wait/?room=
          {params.room}
        </p>
      </Link>
      <Link className="link" to={`/choose/?room=${params.room}`}>
        <button
          onClick={handleClick}
          disabled={!isPlayerJoined}
          className="button"
        >
          {isPlayerJoined ? "Press to start" : "Awaiting 2nd player"}
        </button>
      </Link>
    </div>
  );
}

export default WelcomePage;
