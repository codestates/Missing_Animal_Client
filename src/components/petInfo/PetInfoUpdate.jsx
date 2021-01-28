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
    const res = await axios.put(`http://localhost:8080/pets/edit`, formData, { withCredentials: true });
    // const res = await axios.put(
    //   `http://missinganimals.ml/pets/edit`,
    //   formData,
    //   {
    //     withCredentials: true,
    //   }
    // );
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
        placeholder="Pet Name"
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
          handleToModifyPetInfo(state.updatedPet);
          window.location.reload();
        }}
      >Modify</button>
    </div>
  );
}
export default PetInfoUpdate;
