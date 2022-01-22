import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRef } from "react";
import socketController from "../../utils/SocketIO";
import { advance } from "../../slices/stage.slice";
import { useNavigate } from "react-router-dom";
import Score from "../../components/Score";

function DrawingPage() {
  const stage = useSelector((state) => state.stage.value);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chosenWord = useSelector((state) => state.word.value);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    console.log("STAGE: ", stage);
    if (canvasRef.current) {
      contextRef.current = canvasRef.current.getContext("2d");
    }
  }, []);

  const draw = useCallback(
    (x, y) => {
      if (mouseDown) {
        contextRef.current.beginPath();
        contextRef.current.strokeStyle = "black";
        contextRef.current.lineWidth = 5;
        contextRef.current.lineJoin = "round";
        contextRef.current.moveTo(lastPosition.x, lastPosition.y);
        contextRef.current.lineTo(x, y);
        contextRef.current.closePath();
        contextRef.current.stroke();

        setLastPosition({ x, y });
      }
    },
    [lastPosition, mouseDown, setLastPosition]
  );

  const onMouseDown = (e) => {
    setLastPosition({ x: e.pageX, y: e.pageY });
    setMouseDown(true);
  };

  const onMouseUp = () => {
    setMouseDown(false);
  };

  const onMouseMove = (e) => {
    draw(e.pageX, e.pageY);
  };

  const clear = () => {
    contextRef.current.clearRect(
      0,
      0,
      contextRef.current.canvas.width,
      contextRef.current.canvas.height
    );
  };

  const proceed = async () => {
    const image = canvasRef.current.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);

    socketController.emitBlobURL(blobURL);
    dispatch(advance(3));
    navigate("/wait", { replace: true });
  };

  return (
    <div className="canvas-container">
      <canvas
        style={{
          border: "1px solid #000",
          alignSelf: "center",
          backgroundColor: "#AFC8DE",
        }}
        width={window.screen.width - 2}
        height={window.screen.height / 1.7}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
        onTouchStart={onMouseDown}
        onTouchEnd={onMouseUp}
        onTouchCancel={onMouseUp}
        onTouchMove={onMouseMove}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 className="draw-title">
          Draw the word you chose! ({chosenWord.value})
        </h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <button className="button" onClick={clear}>
            CLEAR
          </button>
          <Score />
          <button className="button" onClick={proceed}>
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
}

export default DrawingPage;
