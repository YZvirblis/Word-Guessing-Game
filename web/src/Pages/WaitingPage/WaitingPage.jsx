import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import socketController from "../../tools/SocketIO";

function WaitingPage() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const room = searchParams.get("room");

  useEffect(() => {
    ////////////////// IF REDUX SAYS IT'S FIRST WAITING STAGE THEN :
    socketController.connect(room);
  }, []);

  return (
    <div>
      <h1>WAITING PAGE</h1>
    </div>
  );
}

export default WaitingPage;
