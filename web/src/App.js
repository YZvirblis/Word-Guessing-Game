import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DrawingPage from "./Pages/DrawingPage/DrawingPage";
import GuessingPage from "./Pages/GuessingPage/GuessingPage";
import WaitingPage from "./Pages/WaitingPage/WaitingPage";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import WordChoose from "./Pages/WordChoose/WordChoose";

// import io from "socket.io-client";
// const randomWords = require("random-words");
// const socket = io.connect("http://localhost:3001/");

function App() {
  // useEffect(() => {
  //   console.log("easy: " + randomWords({ exactly: 1, maxLength: 4 })[0]);
  //   console.log("medium: " + randomWords({ exactly: 1, maxLength: 7 })[0]);
  //   console.log("hard: " + randomWords({ exactly: 1, maxLength: 12 })[0]);

  //   socket.emit("test", "socket is working! sent from: ");
  //   socket.on("test", (data) => {
  //     console.log(data);
  //   });
  //   console.log("loop?");
  // }, [socket]);

  return (
    <Router>
      <Routes>
        <Route path="/choose" element={<WordChoose />} />
        <Route path="/draw" element={<DrawingPage />} />
        <Route path="/guess" element={<GuessingPage />} />
        <Route path="/wait" element={<WaitingPage />} />
        <Route exact path="/" element={<WelcomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
