const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const { userJoin, getUserByRoom, getAllUsers } = require("./utils/users");
const PORT = 3001;

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    console.log("JOINN");
    userJoin(socket.id, room);
    const roomUsers = getUserByRoom(room);
    if (roomUsers.length >= 2) {
      io.emit("joined", true);
    }
  });
  socket.on("advance", (stage) => {
    socket.broadcast.emit("advance", stage);
  });
  socket.on("word-choose", (word) => {
    io.emit("word-choose", { value: word.value, difficulty: word.difficulty });
  });
  socket.on("blob", (url) => {
    io.emit("blob", url);
  });
  socket.on("points", (points) => {
    io.emit("points", points);
  });
});

http.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}/`);
});
