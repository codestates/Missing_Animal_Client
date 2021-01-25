// import React from "react";
// import "../styles/login.css";

import axios from "axios";
import React, { Component } from "react";
import "../styles/Signup.css";
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
      <div className="registerWrapper">
        <div className="registerName"> Missing Animal </div>
        <p className="registerText">회원정보를 입력해주세요</p>
        <input
          placeholder="아이디(이메일)"
          type="email"
          className="inputEmail"
          onChange={this.handleInputValue("email")}
        />
        <input
          placeholder="비밀번호"
          type="password"
          className="inputPassword"
          onChange={this.handleInputValue("password")}
        />
        <input
          placeholder="이름(닉네임))"
          type="username"
          className="inputUsername"
          onChange={this.handleInputValue("username")}
        />
        <input
          placeholder="휴대폰 번호(숫자)"
          type="mobile"
          className="inputMobile"
          onChange={this.handleInputValue("mobile")}
        />
        <button className="registerBtn" onClick={() => this.clickBtn()}>
          회원 가입하기
        </button>
      </div>
    );
  }
}

export default withRouter(Signup);

// function SignUp() {
//   return <div className="Myinfo_menue">회원가입</div>;
// }
// export default SignUp;
