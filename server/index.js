const app = require("express")();
const cors = require("cors");
app.use(cors());
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });
const mongoose = require("mongoose");
const Score = require("./models/score");

const { userJoin, getUserByRoom, getAllUsers } = require("./utils/users");
const PORT = 3001;

io.on("connection", (socket) => {
  let scoreID = "";
  socket.on("join", (room) => {
    userJoin(socket.id, room);
    const allUsers = getAllUsers();

    if (allUsers.length >= 2) {
      scoreID = createScoreInDB(0, 0);
      io.emit("id", scoreID);
    }

    socket.emit("joined", {
      player: allUsers.length >= 2 ? "player2" : "player1",
    });
    io.emit("joined", { twoPlayers: allUsers.length >= 2 ? true : false });
  });

  socket.on("id", (id) => {
    scoreID = id;
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

  socket.on("points", (data) => {
    io.emit("points", data.points);
    updateScore(scoreID, data.time, data.totalScore + data.points);
  });
});

const createScoreInDB = (time, score) => {
  const newScore = new Score({
    time: time,
    score: score,
  });
  newScore
    .save()
    .then((result) => {
      console.log("mongoDB result: ", result);
      return result;
    })
    .catch((err) => {
      console.log("mongoose: ", err);
    });
  return newScore._id;
};
const updateScore = (scoreID, time, score) => {
  console.log("updating score: ", { scoreID, time, score });
  Score.findOneAndUpdate({ _id: scoreID }, { time: time, score: score }).then(
    (result) => {
      console.log("mongoDB result: ", result);
    }
  );
};
const getAllScores = () => {
  allScores = Score.find()
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log("mongoose: ", err);
    });
  return allScores;
};

app.get("/all-scores", (req, res) => {
  getAllScores().then((result) => {
    res.send(result);
  });
});

const dbURI =
  "mongodb+srv://Yuriy:R4030201@cluster0.rxhvf.mongodb.net/moveo-project?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to db");
    http.listen(PORT, () => {
      console.log(`Server is listening on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.log("mongoose: ", err);
  });
