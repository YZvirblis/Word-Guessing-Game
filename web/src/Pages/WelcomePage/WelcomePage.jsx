import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { advance } from "../../slices/stage.slice";
import io from "socket.io-client";
import socketController from "../../utils/SocketIO";
import { SocketContext } from "../../utils/SocketIO";

function WelcomePage(params) {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const stage = useSelector((state) => state.stage.value);

  const [isPlayerJoined, setIsPlayerJoined] = useState(false);
  useEffect(() => {
    console.log("STAGE: ", stage);
    if (stage === 0) {
      console.log("CONNECTING");
      socket.emit("connection");
      socket.emit("join", params.room);
      socket.on("joined", (isTwoPlayers) => {
        setIsPlayerJoined(isTwoPlayers);
      });
    }
  }, []);

  const handleClick = () => {
    socketController.advance(1);
    dispatch(advance(1));
  };

  return (
    <div className="container">
      <h1 className="welcome-title">Welcome!</h1>
      <p className="welcome-subtitle">Send this link to your friend:</p>
      <p className="welcome-link">
        http://localhost:3000/wait/?room=
        {params.room}
      </p>
      <Link className="link" to={`/choose`}>
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
