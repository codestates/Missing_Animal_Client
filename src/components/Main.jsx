import React from "react";
import "../styles/Main.css";
import { Link, withRouter } from "react-router-dom";

// import Signin from "./Signin";

class Main extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   isModalOpen: false,
    // };
  }

  // openModal = () => {
  //   this.setState({ isModalOpen: true });
  // };

  // closeModal = () => {
  //   this.setState({ isModalOpen: false });
  // };

  render() {
    return (
      <div className="flex">
        <div className="main"></div>
        <div className="pageList">
          <div className="map">
            <Link to="/map">
              <div className="ListBtn">지도보기</div>
            </Link>
          </div>
          <div className="board">
            <Link to="/board">
              <div className="ListBtn">게시판</div>
            </Link>
          </div>
          <div className="petRegister">
            <Link to="/petregister">
              <div className="ListBtn">펫 등록하기</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
