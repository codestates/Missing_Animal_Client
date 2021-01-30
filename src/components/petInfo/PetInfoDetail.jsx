import React, { useState } from "react";
import "./petInfoDetail.css";
import axios from "axios";
import PetInfoUpdate from "./PetInfoUpdate";

function PetInfoDetail({
  handleToModifyPetInfo,
  handleToDeletePetInfo,
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
  const [state, setState] = useState({
    toModifyPetInfo: false,
  });

  const token = window.localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const deletePetInfo = async () => {
    const res = await axios.delete(
      `http://localhost:8080/pets/remove/${id}`,
      // `https://missinganimals.ml/pets/remove/${id}`,
      {
        withCredentials: true,
      }
    );
    console.log(res.status, res.statusText);
  };

  return state.toModifyPetInfo ? (
    <PetInfoUpdate
      id={id}
      title={title}
      petname={petname}
      description={description}
      species={species}
      sex={sex}
      missingDate={missingDate.split("T")[0]}
      area={area}
      reward={reward}
      createdAt={createdAt.split("T")[0]}
      petsImages={petsImages}
      handleToModifyPetInfo={handleToModifyPetInfo}
    ></PetInfoUpdate>
  ) : (
    <div className="petInfoDetail">
      <p className="petInfoDetailTitle">{title}</p>
      <div className="petInfoDetailHeader">
        {petsImages.map((image, idx) => (
          <img
            key={idx + 1}
            className="petInfoImage"
            src={image.imagePath}
            alt={"petImage" + (idx + 1)}
          ></img>
        ))}
      </div>
      {/* <div className="petInfoDetailBody"> */}
      <p>Pet Name : {petname}</p>
      <p>Species : {species}</p>
      <p>Sex : {sex}</p>
      <p>Missing Date : {missingDate.split("T")[0]}</p>
      <p>Missing Area : {area}</p>
      <p>Descrioption : {description}</p>
      <p>Reward : {reward}</p>
      <p>Created At : {createdAt.split("T")[0]}</p>
      <div className="fixedButton">
        <span
          className="modifyPetInfoButton"
          onClick={(event) => {
            event.preventDefault();
            setState((prevState) => ({
              ...prevState,
              toModifyPetInfo: !prevState.toModifyPetInfo,
            }));
          }}
        >
          수정
        </span>
        <span
          className="deletePetInfoButton"
          onClick={(event) => {
            event.preventDefault();
            deletePetInfo();
            handleToDeletePetInfo(id);
          }}
        >
          삭제
        </span>
      </div>
      {/* </div> */}
    </div>
  );
}

export default PetInfoDetail;
