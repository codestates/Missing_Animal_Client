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

  const token = window.localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const modifyMyInfo = async () => {
    const res = await axios.put(
      // `http://localhost:8080/users/edit/${userId}`,
      `https://missinganimals.ml/users/edit/${userId}`,
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
    <div className="modifiedBody">
      <div className="each">
        <label>User Name : </label>
        <input
          className="modifiedInput"
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
      </div>
      <div className="each">
        <label>Email : </label>
        <input
          className="modifiedInput"
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
      </div>
      <div className="each">
        <label>Mobile : </label>
        <input
          className="modifiedInput"
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
      </div>
      <div className="each">
        <label>Old Password : </label>
        <input
          className="modifiedInput"
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
      </div>
      <div className="each">
        <label> New Password : </label>
        <input
          className="modifiedInput"
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
      </div>
      <div
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
        수정하기
      </div>
    </div>
  );
}
export default MyInfoUpdate;
