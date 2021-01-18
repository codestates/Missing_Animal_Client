import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("map");
ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Router>
    <App />
  </Router>,
  rootElement
);
