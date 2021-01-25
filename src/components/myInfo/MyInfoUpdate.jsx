import React, { useState } from "react";
import "./myInfoUpdate.css";
import axios from "axios";

function MyInfoUpdate({
  handleToModifyMyInfo,
  userId,
  username,
  email,
  mobile,
}) {

  const [state, setState] = useState({
    userId,
    username,
    email,
    mobile,
    oldpassword: "",
    newpassword: "",
  });

  const getCookie = (name) => {
    var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? value[2] : null;
  };

  const checkLogin = window.localStorage.getItem("Login");
  // const token = getCookie("token");

  let checkToken = getCookie("token");
  if (checkLogin === "naver") {
    checkToken = getCookie("naver_token");
  } else if (checkLogin === "kakao") {
    checkToken = getCookie("access_token");
  } else if (checkLogin === "signin") {
    checkToken = getCookie("token");
  }

  axios.defaults.headers.common["Authorization"] = "Bearer " + checkToken;

  const modifyMyInfo = async () => {
    const res = await axios.put(
      `http://localhost:8080/users/edit/${userId}`,
      // `https://missinganimals.ml/users/edit/${userId}`,
      {
        username: state.username,
        email: state.email,
        mobile: state.mobile,
        oldpassword: state.oldpassword,
        newpassword: state.newpassword,
      },
      { withCredentials: true }
    );
    console.log(res.status, res.statusText);
  };

  return (
    <div className="myInfo">
      <label>User Name : </label>
      <input
        type="text"
        placeholder="User Name"
        value={state.username}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            username: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Email : </label>
      <input
        type="text"
        placeholder="Email"
        value={state.email}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            email: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Mobile : </label>
      <input
        type="text"
        placeholder="Email"
        value={state.mobile}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            mobile: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Old Password : </label>
      <input
        type="password"
        placeholder="Old Password"
        value={state.oldpassword}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            oldpassword: event.target.value,
          }))
        }
      ></input>
      <br />
      <label> New Password : </label>
      <input
        type="password"
        placeholder="New Password"
        value={state.newpassword}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            newpassword: event.target.value,
          }))
        }
      ></input>
      <br />
      <button
        className="requestModifyMyInfoButton"
        onClick={(event) => {
          event.preventDefault();
          modifyMyInfo();
          handleToModifyMyInfo({
            username: state.username,
            email: state.email,
            mobile: state.mobile,
          });
        }}
      >
        Modify
      </button>
    </div>
  );
}
export default MyInfoUpdate;
