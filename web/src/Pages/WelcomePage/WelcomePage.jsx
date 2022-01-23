import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { advance } from "../../slices/stage.slice";
import io from "socket.io-client";
import socketController from "../../utils/SocketIO";
import { SocketContext } from "../../utils/SocketIO";
import axios from "axios";
import { setTimer } from "../../slices/timer.slice";

function WelcomePage(params) {
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const stage = useSelector((state) => state.stage.value);
  const [player, setPlayer] = useState("one");
  const [isPlayerJoined, setIsPlayerJoined] = useState(false);
  const [highScore, setHighScore] = useState({ sum: 0, time: 0, score: 0 });

  useEffect(() => {
    getHighscore();
    socket.emit("connection");
    socket.emit("join", params.room);
    socket.on("joined", (data) => {
      setIsPlayerJoined(data.twoPlayers);
      setPlayer(data.player);
      if (data.twoPlayers) {
        const startTime = Date.now();
        dispatch(setTimer(startTime));
      }
      if (data.player === "player2") {
        navigatePage();
      }
    });
    socket.on("id", (id) => {
      socket.emit("id", id);
    });
  }, []);

  const getHighscore = async () => {
    const allScores = await axios("http://localhost:3001/all-scores");
    let newHighScore = { sum: 0, time: 0, score: 0 };
    for (const score of allScores.data) {
      const sum = score.score / score.time;
      if (sum > newHighScore.sum && sum !== Infinity && sum !== NaN) {
        newHighScore = { sum: sum, time: score.time, score: score.score };
      }
    }

    const minutes = Math.floor(newHighScore.time / 60000);
    const seconds = ((newHighScore.time % 60000) / 1000).toFixed(0);
    setHighScore({
      score: newHighScore.score,
      time: `${minutes ? `${minutes}:` : ""}${seconds} ${
        minutes ? (minutes <= 1 ? `minute` : `minutes`) : "seconds"
      }`,
    });
  };

  const navigatePage = () => {
    navigate("/wait", { replace: true });
  };

  const handleClick = () => {
    socketController.advance(1);
  };

  return (
    <div className="container">
      <h1 className="welcome-title">Welcome!</h1>
      <h5 className="highscore">
        The highscore is {highScore.score} in {highScore.time}
      </h5>
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
