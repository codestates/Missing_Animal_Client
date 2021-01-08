import React from "react";
// import "../styles/App.css";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Board from "./components/board/Board";

function App() {
  return (
    <div>
    <Nav></Nav>
    <Main></Main>
    <Board></Board>
    </div>
  );
}

export default App;
