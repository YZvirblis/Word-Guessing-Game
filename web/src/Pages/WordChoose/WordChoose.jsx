import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const randomWords = require("random-words");

function WordChoose() {
  const [easyWord, setEasyWord] = useState("");
  const [mediumWord, setMediumWord] = useState("");
  const [hardWord, setHardWord] = useState("");

  useEffect(() => {
    ///////////////// USE RANDOM WORDS TO CREATE OWN VOCABULARY BASED ON WORD DIFFICULTY
    setEasyWord(randomWords({ exactly: 1, maxLength: 4 })[0]);
    setMediumWord(randomWords({ exactly: 1, maxLength: 7 })[0]);
    setHardWord(randomWords({ exactly: 1, maxLength: 12 })[0]);
  }, []);

  return (
    <div className="container">
      <h1 className="choose-title">Choose something you can draw:</h1>
      <div className="words-container">
        <Link className="link" to={"/draw:" + easyWord}>
          <button class="word-button">{easyWord}</button>
        </Link>
        <Link className="link" to={"/draw:" + mediumWord}>
          <button class="word-button">{mediumWord}</button>
        </Link>
        <Link className="link" to={"/draw:" + hardWord}>
          <button class="word-button">{hardWord}</button>
        </Link>
      </div>
    </div>
  );
}

export default WordChoose;
