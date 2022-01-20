import React, { useEffect, useState } from "react";
const randomWords = require("random-words");

function WordChoose() {
  const [easyWord, setEasyWord] = useState("");
  const [mediumWord, setMediumWord] = useState("");
  const [hardWord, setHardWord] = useState("");

  useEffect(() => {
    setEasyWord(randomWords({ exactly: 1, maxLength: 4 })[0]);
    setMediumWord(randomWords({ exactly: 1, maxLength: 7 })[0]);
    setHardWord(randomWords({ exactly: 1, maxLength: 12 })[0]);
  }, []);

  return (
    <div className="container">
      <h1 className="choose-title">Choose something you can draw:</h1>
      <div className="words-container">
        <button class="word-button">{easyWord}</button>
        <button class="word-button">{mediumWord}</button>
        <button class="word-button">{hardWord}</button>
      </div>
    </div>
  );
}

export default WordChoose;
