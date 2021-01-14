import React from 'react';
import "../styles/Main.css";

class Main extends React.Component {
  render() {
    return (
      <div className="main_UI">
        <div className="main_intro">
          <img src="intro.jpg" alt="profile" />
          <div>
            이 개는 영국에서부터 시작된.....
          </div>
        </div>
        <div>
          <div className="main_menu">
            <div>지도보기</div>
            <div>게시판</div>
            <div>등록하기</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Main;