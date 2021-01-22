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
        <div className="logo">
          <Link to="/">
            <img src="/images/FindersLogo.png" width="180px" height="90px" />
          </Link>
        </div>
        <div>
          <span className="Btn">
            <Link to="/mypage">
              <div className="mypageBtn">마이페이지</div>
            </Link>
          </span>

          {checkLogin ? (
            <span className="Btn signout">
              <Signout />
            </span>
          ) : (
            <span className="Btn signin">
              {/* <button onClick={this.openModal} className="signinBtn">
                로그인
              </button> */}
              <div onClick={this.openModal} className="signinBtn">
                로그인
              </div>
              <Signin isOpen={this.state.isModalOpen} close={this.closeModal} />
            </span>
          )}

          {/* <span className="Btn signin">
            <div onClick={this.openModal} className="signinBtn">
              로그인
            </div>
             <Signin isOpen={this.state.isModalOpen} close={this.closeModal} />
         </span> */}
        </div>
      </div>
    );
  }
}
export default withRouter(Main_Menu);
