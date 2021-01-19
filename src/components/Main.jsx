import React from 'react';
import "../styles/Main.css"

class Main extends React.Component {
  render() {
    return (
      <div className="main_UI">
        <div className="main_intro">
          <img src="intro.jpg" alt="profile" />
        이 사이트를 만든 이유는 ~
      </div>
        <div>
          <div className="main_menu">
            <div>지도보기</div>
            <div>게시판</div>
            <div>등록하기</div>
          </div>{/*메뉴*/}
        </div>
      </div> //메인 ui
    )
  }
}
export default Main;