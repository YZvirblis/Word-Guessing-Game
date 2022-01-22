import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { advance } from "../../slices/stage.slice";
import io from "socket.io-client";
import socketController from "../../utils/SocketIO";
import { SocketContext } from "../../utils/SocketIO";

function WelcomePage(params) {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const stage = useSelector((state) => state.stage.value);
  const [player, setPlayer] = useState("one");
  const [isPlayerJoined, setIsPlayerJoined] = useState(false);

  useEffect(() => {
    socket.emit("connection");
    socket.emit("join");
    socket.on("joined", (data) => {
      setIsPlayerJoined(data.twoPlayers);
      setPlayer(data.player);
      if (data.player === "player2") {
        navigatePage();
      }
    });
  }, []);

  const navigatePage = () => {
    navigate("/wait", { replace: true });
  };

  const handleClick = () => {
    socketController.advance(1);
  };

  return (
    <div className="container">
      <h1 className="welcome-title">Welcome!</h1>
      <p className="welcome-subtitle">Send this link to your friend:</p>
      <p className="welcome-link">http://localhost:3000/</p>
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
