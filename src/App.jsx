import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Main from "./components/Main";
import MyInfo from "./components/Myinfo";
import SignUp from "./components/Signup";
import Board from "./components/board/Board";
import Map from "./components/Map";
import PetRegister from "./components/petRegister/PetRegister";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <div id="main">
        <Switch>
          <Route exact path="/" render={() => <Main />} />
          <Route exact path="/mypage" render={() => <MyInfo />} />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route exact path="/board" render={() => <Board />} />
          <Route exact path="/map" render={() => <Map />} />
          <Route exact path="/petregister" render={() => <PetRegister />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

// function App() {
//   return (
//     <div>
//       <Nav></Nav>
//       <Main></Main>
//       {/* <Board></Board> */}
//       {/*  <Map /> */}
//       {/* <PetRegister></PetRegister> */}
//     </div>
//   );
// }

// export default App;
