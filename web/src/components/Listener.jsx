import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { setPoints } from "../slices/points.slice";
import { SocketContext } from "../utils/SocketIO";

function Listener() {
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  socket.on("points", (points) => {
    console.log("DISPATCHING POINTS: ", points);
    console.log("dispatched");
    dispatch(setPoints(points / 2));
  });
  return null;
}

export default Listener;
