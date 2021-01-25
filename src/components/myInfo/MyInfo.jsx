import React, { useState, useEffect } from "react";
import "./myInfo.css";
import axios from "axios";
import MyInfoUpdate from "./MyInfoUpdate";
import { Link, withRouter } from "react-router-dom";

function MyInfo() {

  const [state, setState] = useState({
    toModifyMyInfo: false,
    userId: "",
    username: "",
    email: "",
    mobile: "",
    petsList: [],
    createdAt: "",
  });

  useEffect(() => {
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

    const fetchData = async () => {
      // const res = await axios.get('http://localhost:8080/users/myinfo', { withCredentials: true });
      const res = await axios.get("https://missinganimals.ml/users/myinfo", {
        withCredentials: true,
      });
      if (res.status === 200) {
        console.log(res.status, res.statusText);
        setState((prevState) => ({
          ...prevState,
          userId: res.data.userId,
          username: res.data.username,
          email: res.data.email,
          mobile: res.data.mobile,
          petsList: res.data.petslist,
          createdAt: res.data.createdAt,
        }));
      } else {
        console.log(res.status, res.statusText);
      }
    };
    fetchData();
  }, []);

  const { userId, username, email, mobile, createdAt, petsList } = state;
  return (
    <div className="myInfo">
      <div className="myInfoTitle">My Info</div>
      {state.toModifyMyInfo ? (
        <MyInfoUpdate
          userId={userId}
          username={username}
          email={email}
          mobile={mobile}
          handleToModifyMyInfo={(modifiedState) =>
            setState((prevState) => ({
              ...prevState,
              username: modifiedState.username,
              email: modifiedState.email,
              mobile: modifiedState.mobile,
              toModifyMyInfo: !prevState.toModifyMyInfo,
            }))
          }
        ></MyInfoUpdate>
      ) : (
        <div className="myInfoBody">
          <p>User Name : {username}</p>
          <p>Email : {email}</p>
          <p>Mobile : {mobile}</p>
          <p>Created At : {createdAt}</p>
          <Link to="/petpage">
            <p>Registered Pets : {petsList.length}</p>
          </Link>
          <button
            className="modifyMyInfoButton"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                toModifyMyInfo: !prevState.toModifyMyInfo,
              }))
            }
          >Modify My Info</button>
        </div>
      )}
    </div>
  );
}
export default withRouter(MyInfo);
// export default MyInfo;
