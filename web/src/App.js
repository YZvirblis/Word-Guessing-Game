import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001/");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("test", "socket is working! sent from: ");
    socket.on("test", (data) => {
      console.log(data);
      setText(data);
    });
    console.log("loop?");
  }, [socket]);

  return (
    <div className="App">
      <h1>
        {text.data} {text.id}
      </h1>
    </div>
  );
}

export default App;
