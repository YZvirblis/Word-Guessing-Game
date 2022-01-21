const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const { userJoin, getUserByRoom, getAllUsers } = require("./utils/users");
const PORT = 3001;

io.on("connection", (socket) => {
  socket.on("join", (room) => {
    userJoin(socket.id, room);
    console.log("ALL USERS: ", getAllUsers());
    const roomUsers = getUserByRoom(room);
    if (roomUsers.length >= 2) {
      socket.emit("joined", true);
    }
  });
});

http.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}/`);
});
