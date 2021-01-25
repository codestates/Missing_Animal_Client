import React, { useState, useEffect } from "react";
import "./petInfo.css";
import axios from "axios";
import PetInfoDetail from './PetInfoDetail';


function PetInfo() {

  const [state, setState] = useState({
    petsList: [],
    createdAt: "",
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

  useEffect(() => {
    const fetchData = async () => {
      // const res = await axios.get("http://localhost:8080/users/myinfo", { withCredentials: true });
      const res = await axios.get('https://missinganimals.ml/users/myinfo', { withCredentials: true });
      if (res.status === 200) {
        console.log(res.status, res.statusText);
        setState((prevState) => ({
          ...prevState,
          petsList: res.data.petslist,
          createdAt: res.data.createdAt,
        }));
      } else {
        console.log(res.status, res.statusText);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="petInfo">
      <div className="petInfoTitle">Pet Info</div>
      {
        state.petsList.map((pet) => 
          <PetInfoDetail
            key={pet.id}
            id={pet.id}
            title={pet.title}
            petname={pet.petname}
            description={pet.description}
            species={pet.species}
            sex={pet.sex}
            missingDate={pet.missingDate}
            area={pet.area}
            reward={pet.reward}
            createdAt={pet.createdAt}
            petsImages={pet.petsImages}
            handleToModifyPetInfo={(petObj) => {
              const newList = state.petsList.slice();
              let index;
              for (let i = 0; i < newList.length; i++) {
                if (newList[i].id === petObj.id) index = i;
                break;
              }
              newList.splice(index, 1, petObj);
              setState((prevState) => ({
                ...prevState,
                petsList: newList,
              }));
            }}
            handleToDeletePetInfo={(petId) => {
              const newList = state.petsList.slice();
              let index;
              for (let i = 0; i < newList.length; i++) {
                if (newList[i].id === petId) index = i;
                break;
              }
              newList.splice(index, 1);
              setState((prevState) => ({
                ...prevState,
                petsList: newList,
              }));
            }}
          ></PetInfoDetail>
        )
      }
    </div>
  );
}

export default PetInfo;
