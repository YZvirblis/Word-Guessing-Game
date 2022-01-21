import io from "socket.io-client";
const socket = io.connect("http://localhost:3001/");

const socketController = {
  connect: (room) => {
    socket.emit("connection");
    socket.emit("join", room);
  },
  listenJoin: (func) => {
    socket.on("joined", (isTwoPlayers) => {
      ////////// SET IS TWO PLAYERS IN REDUX
      func(isTwoPlayers);
      console.log("IS JOINED: ", isTwoPlayers);
    });
  },
};

export default socketController;
