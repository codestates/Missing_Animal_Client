import React from "react";
import "../styles/Main.css";
import { Link, withRouter } from "react-router-dom";

// import Signin from "./Signin";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="flex">
        <div className="main">
          <img src="/images/test6.gif" />
          {/* <span className="shadow">hi</span> */}
        </div>
        <div className="pageList">
          <div className="intro">
            <div>사랑하는 반려동물을 잃어버렸는데,</div>
            <div>마땅히 도움을 구할 곳이 없나요?</div>
            <div>여기저기 할 수 있는 곳에 신고는 다 했지만,</div>
            <div>감감무소식 인가요?</div>
            <p></p>
            <span className="check active">
              Finders가 당신의 발이 되어 드리겠습니다.
            </span>
            <p></p>
            <span className="highlight">
              지도에 잃어버린 반려동물을 등록하고 <br></br> 더 많은 제보와
              연락을 받으세요.
            </span>
          </div>
          <span>
            <Link to="/map">
              <div className="ListBtn">지도로 확인하기</div>
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

export default withRouter(Main);
