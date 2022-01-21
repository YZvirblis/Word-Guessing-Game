import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { advance } from "../../slices/stage.slice";
import { setChosenWord } from "../../slices/word.slice";
import io from "socket.io-client";

function WaitingPage() {
  const dispatch = useDispatch();
  const stage = useSelector((state) => state.stage.value);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const room = searchParams.get("room");

  let socket = io.connect("http://localhost:3001/");
  if (stage === 0) {
    socket.emit("connection");
    socket.emit("join", room);
  }

  useEffect(() => {
    socket.on("advance", (stage) => {
      dispatch(advance(stage));
    });
    socket.on("word-choose", (word) => {
      dispatch(setChosenWord(word));
    });
  }, []);

  return (
    <div>
      {stage === 0 && <h1>waiting for other player to start the game</h1>}
      {stage === 1 && <h1>waiting for other player to choose a word</h1>}
      {stage === 2 && <h1>Waiting for other player to draw the word</h1>}
    </div>
  );
}

export default WaitingPage;
