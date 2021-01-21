import React from "react";
import "../styles/Main_Menu.css";
import { Link, withRouter } from "react-router-dom";
import Signin from "./Signin";
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
          <span className="Btn signin">
            <div onClick={this.openModal} className="signinBtn">
              로그인
            </div>
            <Signin isOpen={this.state.isModalOpen} close={this.closeModal} />
          </span>
        </div>
      </div>
    );
  }
}
export default withRouter(Main_Menu);
