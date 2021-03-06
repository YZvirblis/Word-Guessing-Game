import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import stageReducer from "./slices/stage.slice";
import wordReducer from "./slices/word.slice";
import blobReducer from "./slices/blob.slice";
import pointsReducer from "./slices/points.slice";
import userReducer from "./slices/user.slice";
import timerReducer from "./slices/timer.slice";

const store = configureStore({
  reducer: {
    word: wordReducer,
    blob: blobReducer,
    points: pointsReducer,
    stage: stageReducer,
    user: userReducer,
    timer: timerReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
