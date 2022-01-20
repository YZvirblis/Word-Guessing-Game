const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const PORT = 3001;

io.on("connection", (socket) => {
  console.log("Socket ID: ", socket.id);
  socket.on("test", (data) => {
    socket.emit("test", { data: data, id: socket.id });
  });
  // socket.on('connection')
});

http.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}/`);
});
