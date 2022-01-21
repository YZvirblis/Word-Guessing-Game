import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DrawingPage from "./Pages/DrawingPage/DrawingPage";
import GuessingPage from "./Pages/GuessingPage/GuessingPage";
import WaitingPage from "./Pages/WaitingPage/WaitingPage";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import WordChoose from "./Pages/WordChoose/WordChoose";
import "./Style.css";
import { v4 } from "uuid";

function App() {
  const room = v4();

  return (
    <Router>
      <Routes>
        <Route path={`/choose`} element={<WordChoose />} />
        <Route path="/draw:word" element={<DrawingPage />} />
        <Route path="/guess" element={<GuessingPage />} />
        <Route path="/wait" element={<WaitingPage />} />
        <Route exact path="/" element={<WelcomePage room={room} />} />
      </Routes>
    </Router>
  );
}

export default App;
