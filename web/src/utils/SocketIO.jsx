import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { advance } from "../slices/stage.slice";
import React from "react";

export const socket = io.connect("http://localhost:3001/");
export const SocketContext = React.createContext();

const socketController = {
  emitChosenWord: (word, stage, difficulty) => {
    socket.emit("word-choose", { value: word, difficulty: difficulty });
    socket.emit("advance", stage);
  },
  advance: (stage) => {
    socket.emit("advance", stage);
  },
  emitBlobURL: (url) => {
    socket.emit("blob", url);
  },
  emitPoints: (points) => {
    socket.emit("points", points);
  },
};

export default socketController;
