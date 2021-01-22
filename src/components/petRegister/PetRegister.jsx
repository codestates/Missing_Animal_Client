
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
      latitude: "",
      longitude: "",
      test: "",
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
      latitude,
      longitude,
      // missingDate,
    } = this.state;

    // 좌표로 주소 얻기
    const getAddress = await axios.get(
      `https://dapi.kakao.com//v2/local/geo/coord2address.json?x=${latitude}&y=${longitude}`,
      { headers: { Authorization: "KakaoAK b5c1749155b0e7951f524756103ea74b" } }
    );

    const address = getAddress.data.documents[0].address.address_name;

    // console.log(
    //   "getAddress",
    //   getAddress.data.documents[0].address.address_name
    // );

    const formData = new FormData();

    formData.append("title", title);
    formData.append("petname", petname);
    formData.append("species", species);
    formData.append("sex", sex);
    formData.append("area", address);
    // formData.append("area", "test");
    formData.append("description", description);
    formData.append("reward", reward);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    img.forEach((ele) => {
      formData.append("img", ele);
    });
    // 현재기준 날짜시간
    const newDate = new Date(new Date().getTime() + 32400000).toISOString();
    const newFormatDate = newDate.split(".")[0].replace("T", " ");
    formData.append("missingDate", newFormatDate);

    const getCookie = (name) => {
      var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return value ? value[2] : null;
    };

    const checkLogin = window.localStorage.getItem("Login");
    // const token = getCookie("token");

    let token = getCookie("token");
    if (checkLogin === "naver") {
      token = getCookie("naver_token");
    } else if (checkLogin === "kakao") {
      token = getCookie("access_token");
    } else if (checkLogin === "signin") {
      token = getCookie("token");
    }

    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

    const res = await axios.post(
      "http://localhost:8080/pets/register",
      formData,
      { withCredentials: true },
      { headers: { "Content-type": "application/x-www-form-urlencoded" } }
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
        img: "",
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
      console.log("displayMarker:", mouseEvent.latLng.La);
    });

    // this.setState({ getLocation: "change" });
  }

  async componentDidMount() {
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
        {
          area: [mouseEvent.latLng.La, mouseEvent.latLng.Ma],
          latitude: mouseEvent.latLng.La,
          longitude: mouseEvent.latLng.Ma,
        },
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
      latitude,
      longitude,
    } = this.state;

    console.log("====", this.state.test);

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
            type="text"
            // placeholder="지도를 클릭해주세요"
            value={area}
            readOnly
          ></input>
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
            window.history.back();
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
