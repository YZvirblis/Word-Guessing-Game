import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import socketController from "../../utils/SocketIO";
import { advance } from "../../slices/stage.slice";
import Score from "../../components/Score";

function GuessingPage() {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.blob.value);
  const chosenWord = useSelector((state) => state.word.value);
  const [guess, setGuess] = useState("");

  const proceed = () => {
    socketController.advance(1);
    dispatch(advance(1));
    if (guess === chosenWord.value) {
      socketController.emitPoints(chosenWord.difficulty);
    }
  };

  const handleOnChange = (e) => {
    setGuess(e.target.value);
  };

  return (
    <div className="container">
      <Score />
      <h1 className="choose-title">Try to guess what your friend draw:</h1>
      <img
        style={{ backgroundColor: "#AFC8DE", width: "75%" }}
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
            textAlign: "center",
            fontSize: "6vw",
            textDecoration: "none",
          }}
          type="text"
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default GuessingPage;
