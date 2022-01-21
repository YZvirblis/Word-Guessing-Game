import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setChosenWord } from "../../slices/word.slice";
import socketController from "../../utils/SocketIO";
import words from "../../utils/words";

const randomWords = require("random-words");

function WordChoose() {
  const dispatch = useDispatch();
  const [easyWord, setEasyWord] = useState("");
  const [mediumWord, setMediumWord] = useState("");
  const [hardWord, setHardWord] = useState("");

  useEffect(() => {
    setWords();
  }, []);

  const setWords = () => {
    setEasyWord(words.easy[Math.floor(Math.random() * words.easy.length)]);
    setMediumWord(
      words.medium[Math.floor(Math.random() * words.medium.length)]
    );
    setHardWord(words.hard[Math.floor(Math.random() * words.hard.length)]);
  };

  const handleChooseWord = (word) => {
    dispatch(setChosenWord(word));
    socketController.emitChosenWord(word, 2);
  };

  return (
    <div className="container">
      <h1 className="choose-title">Choose something you can draw:</h1>
      <div className="words-container">
        <Link className="link" to={"/draw:" + easyWord}>
          <button
            onClick={() => handleChooseWord(easyWord)}
            className="word-button"
          >
            {easyWord}
          </button>
        </Link>
        <Link className="link" to={"/draw:" + mediumWord}>
          <button
            onClick={() => handleChooseWord(mediumWord)}
            className="word-button"
          >
            {mediumWord}
          </button>
        </Link>
        <Link className="link" to={"/draw:" + hardWord}>
          <button
            onClick={() => handleChooseWord(hardWord)}
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
