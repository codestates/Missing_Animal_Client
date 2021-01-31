import React, { useState } from "react";
import "./petInfoUpdate.css";
import axios from "axios";
import FormData from "form-data";

function PetInfoUpdate({
  handleToModifyPetInfo,
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
  axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";

  const token = window.localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const [state, setState] = useState({
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
    updatedPet: {},
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
    // const res = await axios.put(`http://localhost:8080/pets/edit`, formData, {
    //   withCredentials: true,
    // });
    const res = await axios.put(
      `http://missinganimals.ml/pets/edit`,
      formData,
      {
        withCredentials: true,
      }
    );
    if (res.staus === 201) {
      console.log(res.status, res.statusText);
      setState((prevState) => ({
        ...prevState,
        updatedPet: res.data,
      }));
    } else {
      console.log(res.status, res.statusText);
    }
  };

  return (
    <div className="modifiedmyInfo">
      <div className="eachLine">
        <label>제목 : </label>
        <input
          className="eachInput"
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
      </div>
      <div className="eachLine">
        <label>이름 : </label>
        <input
          className="eachInput"
          type="text"
          placeholder="Pet Name"
          value={state.petname}
          onChange={(event) =>
            setState((prevState) => ({
              ...prevState,
              petname: event.target.value,
            }))
          }
        ></input>
      </div>
      <div className="eachLine">
        <label>특이 사항 : </label>
        <input
          className="eachInput"
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
      </div>
      <div className="eachLine">
        <label>품종 : </label>
        <input
          className="eachInput"
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
      </div>
      <div className="eachLine">
        <label>성별 : </label>
        <input
          className="eachInput"
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
      </div>
      <div className="eachLine">
        <label>실종 날짜 : </label>
        <input
          className="eachInput"
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
      </div>
      <div className="eachLine">
        <label>실종 지역 : </label>
        <input
          className="eachInput"
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
      </div>
      <div className="eachLine">
        <label>보상사례금 : </label>
        <input
          className="eachInput"
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
      </div>
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
      </div>
      <div
        className="requestModifyPetInfoButton"
        onClick={(event) => {
          event.preventDefault();
          modifyPetInfo();
          handleToModifyPetInfo(state.updatedPet);
          window.location.reload();
        }}
      >
        수정하기
      </div>
    </div>
  );
}
export default PetInfoUpdate;
