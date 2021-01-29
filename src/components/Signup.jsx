// import React from "react";
// import "../styles/login.css";

import axios from "axios";
import React, { Component } from "react";
import "../styles/Signup.css";
import logo_signup from "../styles/img/FindersLogo.png";
import { withRouter } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      mobile: "",
    };
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  clickBtn = () => {
    const { email, password, username, mobile } = this.state;

    if (
      password.length >= 4 &&
      mobile[0] + mobile[1] + mobile[2] === "010" &&
      mobile.length === 11 &&
      email.includes("@") &&
      email.includes(".")
    ) {
      axios
        // .post("http://localhost:8080/auth/signup", this.state)
        .post("https://missinganimals.ml/auth/signup", this.state)
        .then((res) => {
          this.props.history.push("/");
        })
        .catch((err) => {
          if (err) {
            alert("이미 동일한 이메일이 존재합니다");
          }
        });
    } else {
      alert("유효한 정보가 아닙니다. 다시 작성해주세요");
    }
  };

  render() {
    return (
      <div id="wrap__signup">
        <div className="registerName">
          {/* <form> */}
          <div className="logo_signup">
            <img src={logo_signup} className="signupLogo" />
          </div>
          <span className="registerText">회원정보를 입력해주세요</span>
          <div className="row">
            <div className="col-25">
              <label for="email">이메일</label>
            </div>
            <div className="col-75">
              <input
                placeholder="아이디(이메일)"
                type="email"
                className="inputEmail"
                onChange={this.handleInputValue("email")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="password">비밀번호</label>
            </div>
            <div className="col-75">
              <input
                placeholder="비밀번호"
                type="password"
                className="inputPassword"
                onChange={this.handleInputValue("password")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="username">닉네임</label>
            </div>
            <div className="col-75">
              <input
                placeholder="이름(닉네임)"
                type="username"
                className="inputUsername"
                onChange={this.handleInputValue("username")}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label for="mobile">전화번호</label>
            </div>
            <div className="col-75">
              <input
                placeholder="휴대폰 번호(숫자)"
                type="mobile"
                className="inputMobile"
                onChange={this.handleInputValue("mobile")}
              />
            </div>
          </div>
          <div className="row">
            <input
              type="submit"
              value="회원가입"
              onClick={() => this.clickBtn()}
            />
          </div>
          {/* </form> */}
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
