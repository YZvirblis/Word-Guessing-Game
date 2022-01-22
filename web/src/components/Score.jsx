import React from "react";
import { useSelector } from "react-redux";

function Score() {
  const points = useSelector((state) => state.points.value);

  return (
    <div className="score">
      <h1 className="score-text">score:</h1>
      <h1 className="score-text">{points}</h1>
    </div>
  );
}

export default Score;
