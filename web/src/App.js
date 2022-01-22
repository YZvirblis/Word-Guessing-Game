import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DrawingPage from "./Pages/DrawingPage/DrawingPage";
import GuessingPage from "./Pages/GuessingPage/GuessingPage";
import WaitingPage from "./Pages/WaitingPage/WaitingPage";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import WordChoose from "./Pages/WordChoose/WordChoose";
import "./Style.css";
import { v4 } from "uuid";
import { SocketContext, socket } from "./utils/SocketIO";

function App() {
  const room = v4();
  return (
    <SocketContext.Provider value={socket}>
      <div>
        <Router>
          <Routes>
            <Route path={`/choose`} element={<WordChoose />} />
            <Route path="/draw" element={<DrawingPage />} />
            <Route path="/guess" element={<GuessingPage />} />
            <Route path="/wait" element={<WaitingPage />} />
            <Route exact path="/" element={<WelcomePage room={room} />} />
          </Routes>
        </Router>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
