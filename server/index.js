const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const { userJoin, getUserByRoom, getAllUsers } = require("./utils/users");
const PORT = 3001;

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    console.log("JOIN");
    userJoin(socket.id, room);
    const allUsers = getAllUsers();
    console.log(allUsers);
    socket.emit("joined", {
      player: allUsers.length >= 2 ? "player2" : "player1",
    });
    io.emit("joined", { twoPlayers: allUsers.length >= 2 ? true : false });
  });
  socket.on("advance", (stage) => {
    io.emit("advance", stage);
  });
  socket.on("word-choose", (word) => {
    io.emit("word-choose", { value: word.value, difficulty: word.difficulty });
  });
  socket.on("blob", (url) => {
    io.emit("blob", url);
  });
  socket.on("points", (points) => {
    console.log("EMITING POINTS: ", points);
    io.emit("points", points);
  });
});

http.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}/`);
});
