import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Signout extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.logoutBtn = this.logoutBtn.bind(this);
  }

  logoutBtn = () => {
    axios
      .post("https://missinganimals.ml/signout", { credentials: "include" })
      .then((res) => {
        if (res.data.message === "signout") {
          window.localStorage.removeItem("isLogin");
          this.props.history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      // <button onClick={() => this.logoutBtn()} className="logoutBtn">
      //   로그아웃
      // </button>
      <div onClick={() => this.logoutBtn()} className="logoutBtn">
        로그아웃
      </div>
    );
  }
}

export default withRouter(Signout);
