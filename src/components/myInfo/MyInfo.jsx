import React, { useState, useEffect } from "react";
import "./myInfo.css";
import axios from "axios";
import PetInfoCard from "./PetInfoCard";
import MyInfoUpdate from "./MyInfoUpdate";

function MyInfo() {
  /* 렌더링 조건 설명 : 로그인한 상태(isLogged 값이 true, token이 props로 전달된 상태)일때 myInfo 페이지가 읽기 가능함 */
  // 임시 토큰 설정
  // axios.defaults.headers.common["Authorization"] =
  //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJwc3lreWdAbmF2ZXIuY29tIiwidXNlcm5hbWUiOiLqsJXsmqnqtawiLCJpYXQiOjE2MTEyODQyNDAsImV4cCI6MTYxMTg4OTA0MH0.HQbsWKGNNHccYaipGpSV3D2JzEu3Yyen96nqQ_LKVxs";
  // axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const [state, setState] = useState({
    isLogged: true,
    // isLogged,
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
      // const res = await axios.get('https://missinganimals.ml/users/myinfo', { withCredentials: true });
      const res = await axios.get("https://missinganimals.ml/users/myinfo", {
        withCredentials: true,
      });
      // console.log(res.data);
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

  if (!state.isLogged) {
    return (
      <div className="petRegister">
        마이페이지를 보려면 로그인이 필요합니다.
      </div>
    );
  }

  const { userId, username, email, mobile, createdAt, petsList } = state;
  return (
    <div className="myInfo">
      <div className="myInfoTitle">My Info</div>
      {state.toModifyMyInfo ? (
        <MyInfoUpdate
          // isLogged={isLogged}
          token={token}
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
          <button
            className="modifyMyInfoButton"
            onClick={() =>
              setState((prevState) => ({
                ...prevState,
                toModifyMyInfo: !prevState.toModifyMyInfo,
              }))
            }
          >
            Modify My Info
          </button>
        </div>
      )}
      <div className="registeredPets">
        <p>Registered Pets : {petsList.length}</p>
        {petsList.map((pet) => (
          <PetInfoCard
            isLogged={isLogged}
            // isLogged={isLogged}
            token={token}
            key={pet.id}
            id={pet.id}
            title={pet.title}
            petname={pet.petname}
            thumbnail={pet.petsImages[0].imagePath}
            description={pet.description}
            petsImages={pet.petsImages}
            species={pet.species}
            sex={pet.sex}
            missingDate={pet.missingDate}
            area={pet.area}
            reward={pet.reward}
            createdAt={pet.createdAt}
            handleToModifyPetInfo={(modifiedState) => {
              const list = state.petsList.slice();
              let index;
              for (let i = 0; i < list; i++) {
                if (list[i].id === modifiedState.id) index = i;
              }
              const newList = [...list.splice(index, 1), modifiedState];
              setState((prevState) => ({
                ...prevState,
                petsList: newList,
              }));
            }}
          ></PetInfoCard>
        ))}
      </div>
    </div>
  );
}
export default MyInfo;
