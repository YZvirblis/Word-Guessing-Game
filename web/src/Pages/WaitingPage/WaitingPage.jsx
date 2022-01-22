import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { advance } from "../../slices/stage.slice";
import { setChosenWord } from "../../slices/word.slice";
import io from "socket.io-client";
import { setBlob } from "../../slices/blob.slice";
import { setPoints } from "../../slices/points.slice";
import { SocketContext } from "../../utils/SocketIO";
import Loader from "../../components/Loader";
import Score from "../../components/Score";

function WaitingPage() {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentStage = useSelector((state) => state.stage.value);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const room = searchParams.get("room");
  const [stageState, setStageState] = useState(0);

  const navigatePage = () => {
    navigate("/guess", { replace: true });
  };

  useEffect(() => {
    socket.on("advance", (stage) => {
      if (stage === 3 && currentStage === 2) {
        dispatch(advance(3));
        navigatePage();
        return;
      }
      dispatch(advance(stage));
    });
    socket.on("word-choose", (word) => {
      dispatch(
        setChosenWord({ value: word.value, difficulty: word.difficulty })
      );
    });
    socket.on("blob", (url) => {
      dispatch(setBlob(url));
    });
  }, [currentStage]);

  return (
    <div className="container">
      <Score />
      {currentStage === 0 && (
        <h1 className="wait-title">
          waiting for other player to start the game
        </h1>
      )}
      {currentStage === 1 && (
        <h1 className="wait-title">
          waiting for other player to choose a word
        </h1>
      )}
      {currentStage === 2 && (
        <h1 className="wait-title">
          Waiting for other player to draw the word
        </h1>
      )}
      {currentStage === 3 && (
        <h1 className="wait-title">
          Waiting for other player to guess the word
        </h1>
      )}
      <Loader />
    </div>
  );
}

export default WaitingPage;
