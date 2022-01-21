import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

function Canvas() {
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
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
    console.log(mouseDown, lastPosition);
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
      contextRef.current.width,
      contextRef.current.height
    );
  };
  return (
    <canvas
      style={{ border: "1px solid #000" }}
      width={400}
      height={400}
      ref={canvasRef}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
    />
  );
}

export default Canvas;
