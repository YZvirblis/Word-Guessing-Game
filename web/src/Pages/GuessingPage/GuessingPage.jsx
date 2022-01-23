import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import socketController from "../../utils/SocketIO";
import { advance } from "../../slices/stage.slice";
import Score from "../../components/Score";
import { setPoints } from "../../slices/points.slice";

function GuessingPage() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.blob.value);
  const score = useSelector((state) => state.points.value);
  const chosenWord = useSelector((state) => state.word.value);
  const startTime = useSelector((state) => state.timer.value);
  const [guess, setGuess] = useState("");

  const proceed = () => {
    const currentTime = Date.now();
    const totalTime = currentTime - startTime;
    socketController.advance(1);
    if (guess.toUpperCase() === chosenWord.value.toUpperCase()) {
      socketController.emitPoints(chosenWord.difficulty, score, totalTime);
      // dispatch(setPoints(chosenWord.difficulty));
    } else {
      socketController.emitPoints(0, score, totalTime);
    }
  };

  const handleOnChange = (e) => {
    setGuess(e.target.value);
  };

  return (
    <div className="container">
      <Score />
      <h1 className="choose-title">Try to guess what this is:</h1>
      <img
        style={{
          backgroundColor: "#AFC8DE",
          width: "75%",
          height: "50%",
          objectFit: "contain",
        }}
        src={url}
        alt="drawing"
      />
      <div className="guess-wrapper">
        <Link className="button" to="/choose">
          <button className="link-button" onClick={proceed}>
            DONE
          </button>
        </Link>
        <input
          style={{
            background: "none",
            border: "none",
            borderBottom: "2px solid black",
            borderRadius: "10px",
            textAlign: "center",
            fontSize: "6vw",
            textDecoration: "none",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          }}
          type="text"
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default GuessingPage;
