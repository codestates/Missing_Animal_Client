import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Main from "./components/Main";
import MyInfo from "./components/myInfo/MyInfo";
import PetInfo from "./components/petInfo/PetInfo";
import SignUp from "./components/Signup";
import Board from "./components/board/Board";
import Map from "./components/Map";
import PetRegister from "./components/petRegister/PetRegister";
// import PetMap from "./components/petRegister/PetMap";
import Main_Menu from "./components/Main_Menu";
import "./styles/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    // window.localStorage.setItem("isLogin", false);
    const checkLogin = window.localStorage.getItem("isLogin");

    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Main_Menu />
                <Main />
              </>
            )}
          />
          <Route exact path="/petpage" render={() => <PetInfo />} />
          <Route exact path="/mypage" render={() => <MyInfo />} />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route exact path="/board" render={() => <Board />} />
          <Route exact path="/map" render={() => <Map />} />
          {/* <Route exact path="/mapregister" render={() => <PetMap />} /> */}
          { 
            checkLogin === null
            ? <div>반려동물을 등록하려면 로그인해야 합니다.</div>
            : <Route exact path="/petregister" render={() => <PetRegister />} /> 
          }
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
