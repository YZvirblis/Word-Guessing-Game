import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { advance } from "../slices/stage.slice";
import React from "react";

export const socket = io.connect("http://localhost:3001/");
export const SocketContext = React.createContext();

const socketController = {
  emitChosenWord: (word, difficulty) => {
    socket.emit("word-choose", { value: word, difficulty: difficulty });
  },
  advance: (stage) => {
    socket.emit("advance", stage);
  },
  emitBlobURL: (url) => {
    socket.emit("blob", url);
  },
  emitPoints: (points) => {
    console.log("EMITING POINTS: ", points);
    socket.emit("points", points);
  },
};

export default socketController;
