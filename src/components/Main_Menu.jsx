import React from "react";
import "../styles/Main_Menu.css";
import { Link, withRouter } from "react-router-dom";

import Signin from "./Signin";
import Signout from "./Signout";

class Main_Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
  }

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const checkLogin = window.localStorage.getItem("isLogin");

    return (
      <div className="Main_Menu">
        <div>
          <h1>Finders</h1>
        </div>
        <div>
          {/* <span className="Btn"> */}
          <Link to="/mypage">
            {/* <div className="mypageBtn">마이페이지</div> */}
            <button className="mypageBtn">마이페이지</button>
          </Link>
          {/* </span> */}

          {checkLogin ? (
            <span className="signin">
              <Signout />
            </span>
          ) : (
            <span className="signin">
              <button onClick={this.openModal} className="signinBtn">
                로그인
              </button>
              <Signin isOpen={this.state.isModalOpen} close={this.closeModal} />
            </span>
          )}

          {/* {checkLogin ? (
            <span className="Btn signin">
              <Signout />
            </span>
          ) : (
            <span className="Btn signin">
              <button onClick={this.openModal} className="signinBtn">
                로그인
              </button>
              <Signin isOpen={this.state.isModalOpen} close={this.closeModal} />
            </span>
          )} */}
        </div>
      </div>
    );
  }
}

export default withRouter(Main_Menu);
