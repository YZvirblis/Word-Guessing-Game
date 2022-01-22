import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPoints } from "../slices/points.slice";
import { SocketContext } from "../utils/SocketIO";

function Score() {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const points = useSelector((state) => state.points.value);

  return (
    <div className="score">
      <h1 className="score-text">score:</h1>
      <h1 className="score-text">{points}</h1>
    </div>
  );
}

export default Score;
