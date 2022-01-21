const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const { userJoin, getUserByRoom, getAllUsers } = require("./utils/users");
const PORT = 3001;

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    userJoin(socket.id, room);
    const roomUsers = getUserByRoom(room);
    if (roomUsers.length >= 2) {
      console.log("two players joined");
      io.emit("joined", true);
    }
  });
  socket.on("advance", (stage) => {
    console.log("advancing stage");
    io.emit("advance", stage);
  });
  socket.on("word-choose", (word, stage) => {
    console.log("CHOSEN WORD: ", word + " " + stage);
    io.emit("word-choose", word);
    io.emit("advance", stage);
  });
});

http.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}/`);
});
