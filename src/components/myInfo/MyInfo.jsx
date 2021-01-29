import React, { useState, useEffect } from "react";
import "./myInfo.css";
import axios from "axios";
import MyInfoUpdate from "./MyInfoUpdate";
import Main_Menu from "../Main_Menu";
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
    const token = window.localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

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
      <Main_Menu></Main_Menu>
      <div className="menuBar">
        <Link className="barButton" to="/mypage">
          <span className="barButtonText click active">My Info</span>
        </Link>
        <p></p>
        <Link className="barButton" to="/petpage">
          <span className="barButtonText">My Post</span>
        </Link>
      </div>
      <div className="mainBody">
        {/* <div className="myInfoTitle">My Info</div> */}
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
            <span
              className="modifyMyInfoButton"
              onClick={() =>
                setState((prevState) => ({
                  ...prevState,
                  toModifyMyInfo: !prevState.toModifyMyInfo,
                }))
              }
            >
              Modify My Info
            </span>
            <br></br>
            <Link to="/petpage">
              {/* <span className="goToPetPage">
                내가 등록한 반려동물 확인하기 : 현재 {petsList.length}개의 글
                등록
              </span> */}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
export default withRouter(MyInfo);
// export default MyInfo;
