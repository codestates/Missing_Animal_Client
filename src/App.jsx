import React from "react";
// import "../styles/App.css";
import Main from "./components/Main";
import Nav from "./components/Nav";

import Board from "./components/board/Board";
// import PetRegister from "./components/petRegister/PetRegister";

function App() {
  return (
    <div>
      <Nav></Nav>
      <Main></Main>
      <Board></Board>
      {/* <PetRegister></PetRegister> */}
    </div>
  );
}

export default App;
