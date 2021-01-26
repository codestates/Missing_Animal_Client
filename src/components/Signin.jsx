// import React, { Component } from "react";
import React from "react";
import axios from "axios";
import "../styles/Signin.css";

import { withRouter, Link } from "react-router-dom";

class Signin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      email: "",
      password: "",
      isEmailChecked: false,
      isPasswordChecked: false,
    };

    this.loginHandler = this.loginHandler.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.naverLoginHandler = this.naverLoginHandler.bind(this);
    this.kakaoLoginHandler = this.kakaoLoginHandler.bind(this);

    this.NAVER_LOGIN_URL =
    // "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=vbUF8EMae9G5PmUfbyRh&state=MiAn&redirect_uri=http://localhost:3000";
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=vbUF8EMae9G5PmUfbyRh&state=MiAn&redirect_uri=https://missinganimal.ml";

    this.KAKAO_LOGIN_URL =
    // "https://kauth.kakao.com/oauth/authorize?client_id=e728a9738a0f6dd292c373b3ec9e5b45&redirect_uri=http://localhost:3000&response_type=code";
      "https://kauth.kakao.com/oauth/authorize?client_id=e728a9738a0f6dd292c373b3ec9e5b45&redirect_uri=https://missinganimal.ml&response_type=code";
  }

  loginHandler() {
    window.localStorage.setItem("isLogin", true);
    // window.localStorage.setItem("Login", "signin");
    this.props.close();
    this.props.history.push({
      isLogin: this.state.isLogin,
    });
  }

  async getAccessToken(authorizationCode) {
    // 네이버
    if (authorizationCode.length === 18) {
      const resp = await axios.post(
        // "http://localhost:8080/auth/naver",
        "https://missinganimals.ml/auth/naver",
        {
          authorizationCode: authorizationCode,
        },
        { withCredentials: true }
      );

      if (resp.data.message === "naver login") {
        window.localStorage.setItem("token", resp.data.token);
        window.localStorage.setItem("isLogin", true);
        // window.localStorage.setItem("Login", "naver");
        this.props.history.push("/");
      }
    }
    // 카카오
    else {
      const resp = await axios.post(
        // "http://localhost:8080/auth/kakao",
        "https://missinganimals.ml/auth/kakao",
        {
          authorizationCode: authorizationCode,
        },
        { withCredentials: true }
      );

      if (resp.data.message === "kakao login") {
        window.localStorage.setItem("token", resp.data.token);
        window.localStorage.setItem("isLogin", true);
        // window.localStorage.setItem("Login", "kakao");
        this.props.history.push("/");
      }
    }
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    if (authorizationCode) {
      this.getAccessToken(authorizationCode);
    }
  }

  naverLoginHandler() {
    window.location.assign(this.NAVER_LOGIN_URL);
  }

  kakaoLoginHandler() {
    window.location.assign(this.KAKAO_LOGIN_URL);
  }

  emailValidator = (e) => {
    const emailInput = e.target.value;
    if (
      emailInput.length > 4 &&
      emailInput.includes("@") &&
      emailInput.includes(".")
    ) {
      this.setState({ isEmailChecked: true });
      this.setState({ email: emailInput });
    } else {
      this.setState({ isEmailChecked: false });
    }
  };

  passwordValidator = (e) => {
    const passwordInput = e.target.value;
    if (passwordInput.length >= 4) {
      this.setState({ isPasswordChecked: true });
      this.setState({ password: passwordInput });
    } else {
      this.setState({ isPasswordChecked: false });
    }
  };

  loginRequestHandler = async () => {
    const { email, password, isEmailChecked, isPasswordChecked } = this.state;

    // 이메일, 비밀번호 체크
    if (isEmailChecked === false || isPasswordChecked === false) {
      alert("아이디, 비밀번호를 확인해주세요");
    } else if (isEmailChecked && isPasswordChecked) {
      const loginRequest = await axios.post(
        // "http://localhost:8080/auth/signin",
        "https://missinganimals.ml/auth/signin",
        { email, password },
        { withCredentials: true }
      );
      if (loginRequest.data.message === "signin OK") {
        window.localStorage.setItem("token", loginRequest.data.token);
        this.loginHandler();
      }
    }
  };

  convertToSignup = () => {
    this.props.history.push("/signup");
  };

  render() {
    const { isOpen, close } = this.props;

    // { isLogin ? <Board /> : <Signin loginHandler={this.loginHandler} />}

    return (
      <>
        {isOpen ? (
          // isopen이 true: 코드를 실행, false: null
          // <div onClick={close}> 버튼, 입력 창 제외 다른 부분(회색바탕) 클릭시 모달이 꺼짐
          // <span className="close" onClick={close}>&times;</span> (&times; = x버튼) 누를시 꺼짐
          // isOpen이 true: 모달 켜짐, false: 모달 꺼짐

          <div className="loginModal">
            {/* <div onClick={close}> */}
            <div className="loginList">
              <span className="close" onClick={close}>
                &times;
              </span>
              <div className="modalContents" onClick={() => isOpen}>
                <div className="signinName"> Missing Animal </div>
                <input
                  className="loginId"
                  placeholder="아이디(이메일)"
                  onChange={this.emailValidator.bind(this)}
                />
                <input
                  className="loginPw"
                  type="password"
                  placeholder="비밀번호"
                  onChange={this.passwordValidator.bind(this)}
                />
                <button
                  className="loginBtn"
                  onClick={this.loginRequestHandler.bind(this)}
                >
                  로그인
                </button>
                <div className="socialBox">
                  <div className="kakao">
                    <div
                      className="btn__kakao"
                      onClick={this.kakaoLoginHandler}
                    >
                      카카오 계정으로 로그인
                    </div>
                  </div>
                  <div className="naver">
                    <div
                      className="btn__naver"
                      onClick={this.naverLoginHandler}
                    >
                      네이버 계정으로 로그인
                    </div>
                  </div>
                </div>
                <div>
                  <Link to="/signup" className="loginEnd">
                    <button
                      className="signUpBtn"
                      onClick={this.convertToSignup.bind(this)}
                    >
                      회원가입
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        ) : null}
      </>
    );
  }
}

export default withRouter(Signin);
