import React, { useState } from "react";
import "./petInfoUpdate.css";
import axios from "axios";
import FormData from "form-data";

function PetInfoUpdate({
  toggleToModifyPetInfo,
  handleToModifyPetInfo,
  isLogged,
  token,
  id,
  title,
  petname,
  description,
  species,
  sex,
  missingDate,
  area,
  reward,
  createdAt,
  petsImages,
}) {
  /* 렌더링 조건 설명 : 로그인한 상태(isLogged 값이 true, token이 props로 전달된 상태)일때 myInfo 페이지가 읽기 가능함 */
  // 임시 토큰 설정
  //   axios.defaults.headers.common["Authorization"] =
  //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjaGFybGllQGNvZGVzdGF0ZXMuY29tIiwidXNlcm5hbWUiOiJDaGFybGllIiwiaWF0IjoxNjEwOTU1Njk3LCJleHAiOjE2MTE1NjA0OTd9.mdQ3_zFrWK6l5CBxTaH6Li6gJQtscVTlVeTmeRE6x0w";
  // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
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

  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  const [state, setState] = useState({
    isLogged: true,
    // isLogged,
    id,
    title,
    petname,
    description,
    species,
    sex,
    missingDate,
    area,
    reward,
    createdAt,
    img: petsImages,
  });

  const modifyPetInfo = async () => {
    const formData = new FormData();
    formData.append("petId", state.id);
    formData.append("title", state.title);
    formData.append("petname", state.petname);
    formData.append("description", state.description);
    formData.append("species", state.species);
    formData.append("sex", state.sex);
    formData.append("area", state.area);
    formData.append("reward", state.reward);
    state.img.forEach((ele) => {
      formData.append("img", ele);
    });
    /* 현재기준 실종 날짜 설정 */
    // const newDate = new Date(new Date().getTime()+32400000).toISOString();
    // const newFormatDate = newDate.split('.')[0].replace('T', ' ');
    // formData.append('missingDate', newFormatDate);
    /* 사용자입력 실종 날짜 */
    formData.append("missingDate", missingDate);
    // const res = await axios.put(`https://missinganimals.ml/pets/edit`, formData, { withCredentials: true });
    const res = await axios.put(
      `https://missinganimals.ml/pets/edit`,
      formData,
      {
        withCredentials: true,
      }
    );
    console.log(res.data);
    if (res.staus === 201) {
      console.log(res.status, res.statusText);
      handleToModifyPetInfo(res.data);
    } else {
      console.log(res.status, res.statusText);
    }
  };

  if (!state.isLogged) {
    return (
      <div className="petInfoModify">
        Pet Info를 수정하려면 로그인이 필요합니다.
      </div>
    );
  }

  return (
    <div className="myInfo">
      <label>Title : </label>
      <input
        type="text"
        placeholder="Title"
        value={state.title}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            title: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Pet Name : </label>
      <input
        type="text"
        placeholder="et Name"
        value={state.petname}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            petname: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Description : </label>
      <input
        type="text"
        placeholder="Description"
        value={state.description}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            description: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Species : </label>
      <input
        type="text"
        placeholder="Species"
        value={state.species}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            species: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Sex : </label>
      <input
        type="text"
        placeholder="Sex"
        value={state.sex}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            sex: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Missing Date : </label>
      <input
        type="text"
        placeholder="Missing Date"
        value={state.missingDate}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            missingDate: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Missing Area : </label>
      <input
        type="text"
        placeholder="Missing Area"
        value={state.area}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            area: event.target.value,
          }))
        }
      ></input>
      <br />
      <label>Reward : </label>
      <input
        type="text"
        placeholder="Reward"
        value={state.reward}
        onChange={(event) =>
          setState((prevState) => ({
            ...prevState,
            reward: event.target.value,
          }))
        }
      ></input>
      <br />
      <div className="petModifyImages">
        <input
          type="file"
          multiple
          onChange={(event) =>
            setState((prevState) => ({
              ...prevState,
              img: [...event.target.files],
            }))
          }
        ></input>
        <br />
      </div>
      <button
        className="requestModifyPetInfoButton"
        onClick={(event) => {
          event.preventDefault();
          modifyPetInfo();
          toggleToModifyPetInfo();
          window.location.reload();
        }}
      >
        Modify
      </button>
    </div>
  );
}
export default PetInfoUpdate;
