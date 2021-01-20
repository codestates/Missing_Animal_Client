import React, { useState } from "react";
import "./petRegister.css";
import FormData from "form-data";
import axios from "axios";

/*global kakao*/
class PetRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: "",
      marker: [],
      value: "",
      title: "",
      petname: "",
      species: "",
      sex: "",
      area: "",
      description: "",
      reward: "",
      img: [],
    };

    this.displayMaker = this.displayMaker.bind(this);
  }

  registerPet = async () => {
    const {
      title,
      petname,
      species,
      sex,
      area,
      description,
      reward,
      img,
      // missingDate,
    } = this.state;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("petname", petname);
    formData.append("species", species);
    formData.append("sex", sex);
    formData.append("area", area);
    formData.append("description", description);
    formData.append("reward", reward);
    img.forEach((ele) => {
      formData.append("img", ele);
    });
    // 현재기준 날짜시간
    const newDate = new Date(new Date().getTime() + 32400000).toISOString();
    const newFormatDate = newDate.split(".")[0].replace("T", " ");
    formData.append("missingDate", newFormatDate);
    const res = await axios.post(
      "http://localhost:8080/pets/register",
      formData,
      { withCredentials: true }
    );
    if (res.status === 201) {
      console.log(res.status, res.statusText);
      this.setState(() => ({
        title: "",
        petname: "",
        species: "",
        sex: "",
        area: "",
        description: "",
        reward: "",
        img: [],
        // missingDate: '',
      }));
    } else {
      console.log(res.status, res.statusText);
    }
  };

  displayMaker() {
    const marker = new window.kakao.maps.Marker({});

    marker.setMap(this.map);

    kakao.maps.event.addListener(this.map, "click", function (mouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
    });

    // console.log("displayMarker:", test);
    // this.setState({ getLocation: "change" });
  }

  componentDidMount() {
    // const { area } = this.state;
    let container = document.getElementById("map");

    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.508502, 127.074719), //지도의 중심좌표
      level: 5, //지도의 레벨(확대, 축소 정도)
    };

    //지도 생성 및 객체 리턴
    this.map = new kakao.maps.Map(container, options);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
    this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
    var zoomControl = new kakao.maps.ZoomControl();
    this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    kakao.maps.event.addListener(this.map, "click", (mouseEvent) => {
      // 원하는 액션
      //   console.log("Lat:", mouseEvent.latLng.La);
      //   console.log("Lng:", mouseEvent.latLng.Ma);
      this.displayMaker();
      this.setState(
        { area: [mouseEvent.latLng.La, mouseEvent.latLng.Ma] },
        function () {}
      );
    });
  }

  render() {
    const {
      title,
      petname,
      species,
      sex,
      area,
      description,
      reward,
      img,
    } = this.state;

    console.log("=location=", area);

    return (
      <div className="petRegister">
        <div>Pet Register</div>
        <div className="petRegisterHeader">
          <label>Title : </label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) =>
              this.setState((prevState) => ({
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
            value={petname}
            onChange={(event) =>
              this.setState((prevState) => ({
                ...prevState,
                petname: event.target.value,
              }))
            }
          ></input>
          <br />
        </div>
        <div className="petRegisterBody">
          <label>Species : </label>
          <input
            type="text"
            placeholder="Species"
            value={species}
            onChange={(event) =>
              this.setState((prevState) => ({
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
            value={sex}
            onChange={(event) =>
              this.setState((prevState) => ({
                ...prevState,
                sex: event.target.value,
              }))
            }
          ></input>
          <br />
          <label>Missing Area : </label>
          <input
            // type="text"
            type="text"
            placeholder="지도를 클릭해주세요"
            value={area}
            onChange={(event) => (
              () => this.displayMaker(event), this.setState(area)
              // window.location.reload()
            )}
          ></input>
          {/* <input
            type="text"
            placeholder="Missing Area"
            value={area}
            onChange={(event) =>
              this.setState((prevState) => ({
                ...prevState,
                area: event.target.value,
              }))
            }
          ></input> */}
          <br />
          <label>Description : </label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(event) =>
              this.setState((prevState) => ({
                ...prevState,
                description: event.target.value,
              }))
            }
          ></input>
          <br />
          <label>Reward : </label>
          <input
            type="text"
            placeholder="Reward"
            value={reward}
            onChange={(event) =>
              this.setState((prevState) => ({
                ...prevState,
                reward: event.target.value,
              }))
            }
          ></input>
          <br />
        </div>
        <div className="petRegisterImages">
          <input
            type="file"
            multiple
            // onChange={(event) => console.log(event)}
            onChange={(event) =>
              this.setState((prevState) => ({
                ...prevState,
                img: [...event.target.files],
              }))
            }
          ></input>
          <br />
        </div>
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            this.registerPet();
          }}
        >
          Register
        </button>
        <>
          <div id="map"></div>
        </>
      </div>
    );
  }
}

export default PetRegister;

// function PetRegister({ location }) {
//   console.log("location:", location);
//   //
//   axios.defaults.headers.post["Content-Type"] =
//     "application/x-www-form-urlencoded";
//   // axios.defaults.headers.common["Authorization"] = "Bearer " + token;
//   // 임시 토큰
//   axios.defaults.headers.common["Authorization"] =
//     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJjaGFybGllQGNvZGVzdGF0ZXMuY29tIiwidXNlcm5hbWUiOiJDaGFybGllIiwiaWF0IjoxNjEwOTU1Njk3LCJleHAiOjE2MTE1NjA0OTd9.mdQ3_zFrWK6l5CBxTaH6Li6gJQtscVTlVeTmeRE6x0w";
//   const [state, setState] = useState({
//     title: "",
//     petname: "",
//     species: "",
//     sex: "",
//     area: "",
//     description: "",
//     reward: "",
//     img: [],
//     // missingDate: '',
//   });
//   const registerPet = async () => {
//     const {
//       title,
//       petname,
//       species,
//       sex,
//       area,
//       description,
//       reward,
//       img,
//       // missingDate,
//     } = state;
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("petname", petname);
//     formData.append("species", species);
//     formData.append("sex", sex);
//     formData.append("area", area);
//     formData.append("description", description);
//     formData.append("reward", reward);
//     img.forEach((ele) => {
//       formData.append("img", ele);
//     });
//     // 현재기준 날짜시간
//     const newDate = new Date(new Date().getTime() + 32400000).toISOString();
//     const newFormatDate = newDate.split(".")[0].replace("T", " ");
//     formData.append("missingDate", newFormatDate);
//     const res = await axios.post(
//       "http://localhost:8080/pets/register",
//       formData,
//       { withCredentials: true }
//     );
//     if (res.status === 201) {
//       console.log(res.status, res.statusText);
//       setState(() => ({
//         title: "",
//         petname: "",
//         species: "",
//         sex: "",
//         area: "",
//         description: "",
//         reward: "",
//         img: [],
//         // missingDate: '',
//       }));
//     } else {
//       console.log(res.status, res.statusText);
//     }
//   };

//   return (
//     <div className="petRegister">
//       <div>Pet Register</div>
//       <div className="petRegisterHeader">
//         <label>Title : </label>
//         <input
//           type="text"
//           placeholder="Title"
//           value={state.title}
//           onChange={(event) =>
//             setState((prevState) => ({
//               ...prevState,
//               title: event.target.value,
//             }))
//           }
//         ></input>
//         <br />
//         <label>Pet Name : </label>
//         <input
//           type="text"
//           placeholder="Pet Name"
//           value={state.petname}
//           onChange={(event) =>
//             setState((prevState) => ({
//               ...prevState,
//               petname: event.target.value,
//             }))
//           }
//         ></input>
//         <br />
//       </div>
//       <div className="petRegisterBody">
//         <label>Species : </label>
//         <input
//           type="text"
//           placeholder="Species"
//           value={state.species}
//           onChange={(event) =>
//             setState((prevState) => ({
//               ...prevState,
//               species: event.target.value,
//             }))
//           }
//         ></input>
//         <br />
//         <label>Sex : </label>
//         <input
//           type="text"
//           placeholder="Sex"
//           value={state.sex}
//           onChange={(event) =>
//             setState((prevState) => ({
//               ...prevState,
//               sex: event.target.value,
//             }))
//           }
//         ></input>
//         <br />
//         <label>Missing Area : </label>
//         <input
//           type="text"
//           placeholder="Missing Area"
//           value={state.area}
//           onChange={(event) =>
//             setState((prevState) => ({
//               ...prevState,
//               area: event.target.value,
//             }))
//           }
//         ></input>
//         <br />
//         {/* <label>Missing Date : </label>
//                 <input type='text' placeholder='Missing Date' value={state.missingDate}
//                     onChange={(event) => setState((prevState) => ({
//                         ...prevState,
//                         missingDate: event.target.value
//                     }))}
//                 ></input><br /> */}
//         <label>Description : </label>
//         <input
//           type="text"
//           placeholder="Description"
//           value={state.description}
//           onChange={(event) =>
//             setState((prevState) => ({
//               ...prevState,
//               description: event.target.value,
//             }))
//           }
//         ></input>
//         <br />
//         <label>Reward : </label>
//         <input
//           type="text"
//           placeholder="Reward"
//           value={state.reward}
//           onChange={(event) =>
//             setState((prevState) => ({
//               ...prevState,
//               reward: event.target.value,
//             }))
//           }
//         ></input>
//         <br />
//       </div>
//       <div className="petRegisterImages">
//         <input
//           type="file"
//           multiple
//           // onChange={(event) => console.log(event)}
//           onChange={(event) =>
//             setState((prevState) => ({
//               ...prevState,
//               img: [...event.target.files],
//             }))
//           }
//         ></input>
//         <br />
//       </div>
//       <button
//         type="submit"
//         onClick={(event) => {
//           event.preventDefault();
//           registerPet();
//         }}
//       >
//         Register
//       </button>
//     </div>
//   );
// }
// export default PetRegister;
// import React from 'react';
// import './petRegister.css';
// // 이미지 업로드 관련 스터디 요망: multer, multer-s3

// function PetRegister() {
//     return (
//         <div className='petRegister'>
//             <div>Pet Register</div>
//             <div className='petRegisterHeader'>
//                 <label>Title : </label>
//                 <input type='text' placeHolder='Title'></input><br />
//                 <label>Pet Name : </label>
//                 <input placeHolder='Pet Name'></input><br />
//             </div>
//             <div className='petRegisterBody'>
//                 <label>Species : </label>
//                 <input placeHolder='Species'></input><br />
//                 <label>Sex : </label>
//                 <input placeHolder='Sex'></input><br />
//                 <label>Missing Area : </label>
//                 <input placeHolder='Missing Area'></input><br />
//                 <label>Missing Date : </label>
//                 <input placeHolder='Missing Date'></input><br />
//                 <label>Description : </label>
//                 <input placeHolder='Description'></input><br />
//                 <label>Reward : </label>
//                 <input placeHolder='Reward'></input><br />
//             </div>
//             <div className='petRegisterImages'>
//                 <input type="file" placeHolder="petImage1"></input><br />
//                 <input type="file" placeHolder="petImage2"></input><br />
//                 <input type="file" placeHolder="petImage3"></input><br />
//             </div>
//             <button type='submit'>Register Pet</button>
//         </div>
//     );
// }

// export default PetRegister;
