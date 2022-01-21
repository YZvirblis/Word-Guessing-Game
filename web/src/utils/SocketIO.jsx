import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { advance } from "../slices/stage.slice";

const socket = io.connect("http://localhost:3001/");

const socketController = {
  emitChosenWord: (word, stage) => {
    socket.emit("word-choose", word);
    socket.emit("advance", stage);
  },
};

export default socketController;
