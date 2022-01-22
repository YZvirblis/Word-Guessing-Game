import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setChosenWord } from "../../slices/word.slice";
import socketController from "../../utils/SocketIO";
import words from "../../utils/words";
import Score from "../../components/Score";
import { advance } from "../../slices/stage.slice";

const randomWords = require("random-words");

function WordChoose() {
  const dispatch = useDispatch();
  const currentStage = useSelector((state) => state.stage.value);
  const [easyWord, setEasyWord] = useState("");
  const [mediumWord, setMediumWord] = useState("");
  const [hardWord, setHardWord] = useState("");

  useEffect(() => {
    console.log("STAGE: ", currentStage);
    setWords();
  }, []);

  const setWords = () => {
    setEasyWord(words.easy[Math.floor(Math.random() * words.easy.length)]);
    setMediumWord(
      words.medium[Math.floor(Math.random() * words.medium.length)]
    );
    setHardWord(words.hard[Math.floor(Math.random() * words.hard.length)]);
  };

  const handleChooseWord = (word, difficulty) => {
    dispatch(setChosenWord({ value: word, difficulty: difficulty }));
    socketController.emitChosenWord(word, 2, difficulty);
    dispatch(advance(2));
  };

  return (
    <div className="container">
      <Score />
      <h1 className="choose-title">Choose something you can draw:</h1>
      <div className="words-container">
        <Link className="link" to={"/draw"}>
          <button
            onClick={() => handleChooseWord(easyWord, 1)}
            className="word-button"
          >
            {easyWord}
          </button>
        </Link>
        <Link className="link" to={"/draw"}>
          <button
            onClick={() => handleChooseWord(mediumWord, 3)}
            className="word-button"
          >
            {mediumWord}
          </button>
        </Link>
        <Link className="link" to={"/draw"}>
          <button
            onClick={() => handleChooseWord(hardWord, 5)}
            className="word-button"
          >
            {hardWord}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default WordChoose;
