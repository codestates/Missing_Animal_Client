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
        <div className="main">
          {/* <div className="intro">
            <p>어느 날 갑작스럽게, 사랑하는 내 반려동물을 잃어버렸다.</p>
            <p>
              길 잃은 내 아이가 배를 곪고 있는지는 않는지, 도로 위의 위험에
              그대로 노출되어 있는지는 않는지, 너무나 걱정되어 일이 손에 잡히지
              않는다.
            </p>
            <p>
              급한대로 전단지를 만들어 우리동네 여러군데 붙였지만, 다른
              동네들까지 붙이고 다니려니 그럴 여력이 없다.
            </p>
            <p>
              동물 보호센터 홈페이지나, 구청의 동물보호부서에 글도 올리고 신고를
              해봤지만, 연락은 묵묵부답이다.
            </p>
          </div> */}
        </div>
        <div className="pageList">
          <div className="map">
            <Link to="/map">
              <div className="ListBtn">지도로 확인하기</div>
            </Link>
          </div>
          <div className="board">
            <Link to="/board">
              <div className="ListBtn">등록 목록</div>
            </Link>
          </div>
          <div className="petRegister">
            <Link to="/petregister">
              <div className="ListBtn">반려동물 등록하기</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
