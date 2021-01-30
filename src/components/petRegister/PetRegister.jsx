import React from "react";
import "./petRegister.css";
import logo_petRegister from "./FindersLogo.png";
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
      missingDate: "",
      latitude: "",
      longitude: "",
      test: "",
    };
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
      missingDate,
    } = this.state;

    if (latitude === "" || longitude === "") {
      alert("모든 정보를 입력해주세요");
    } else {
      // // 좌표로 주소 얻기
      // const getAddress = await axios.get(
      //   `https://dapi.kakao.com//v2/local/geo/coord2address.json?x=${latitude}&y=${longitude}`,
      //   {
      //     headers: {
      //       Authorization: "KakaoAK b5c1749155b0e7951f524756103ea74b",
      //     },
      //   }
      // );

      // const address = getAddress.data.documents[0].address.address_name;

      const formData = new FormData();

      formData.append("title", title);
      formData.append("petname", petname);
      formData.append("species", species);
      formData.append("sex", sex);
      // formData.append("area", address);
      formData.append("area", area);
      formData.append("description", description);
      formData.append("reward", reward);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);
      img.forEach((ele) => {
        formData.append("img", ele);
      });
      formData.append("missingDate", missingDate);

      // 현재기준 날짜시간
      // const newDate = new Date(new Date().getTime() + 32400000).toISOString();
      // const newFormatDate = newDate.split(".")[0].replace("T", " ");
      // formData.append("missingDate", newFormatDate);

      const token = window.localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;

      if (
        !title ||
        !petname ||
        !species ||
        !sex ||
        !area ||
        !description ||
        !reward ||
        !img ||
        !missingDate
      ) {
        alert("모든 정보를 입력해주세요");
      } else {
        const res = await axios.post(
          "http://localhost:8080/pets/register",
          // "https://missinganimals.ml/pets/register",
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
            missingDate: "",
          }));
          window.location.href = "/petpage";
        } else {
          alert("모든 정보를 입력해주세요");
          console.log(res.status, res.statusText);
        }
      }
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
      // console.log("displayMarker:", mouseEvent.latLng.La);
    });

    kakao.maps.event.addListener(this.map, "click", (mouseEvent) => {
      axios
        .get(
          `https://dapi.kakao.com//v2/local/geo/coord2address.json?x=${mouseEvent.latLng.La}&y=${mouseEvent.latLng.Ma}`,
          {
            headers: {
              Authorization: "KakaoAK b5c1749155b0e7951f524756103ea74b",
            },
          }
        )
        .then((res) => {
          this.setState(
            {
              area: res.data.documents[0].address.address_name,
              latitude: mouseEvent.latLng.La,
              longitude: mouseEvent.latLng.Ma,
            },
            function () {}
          );
        });
    });
  }

  changeType() {
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
    this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
    var zoomControl = new kakao.maps.ZoomControl();
    this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 지도에 컨트롤을 추가해야 지도위에 표시
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미
    this.map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
  }

  mapScript = () => {
    let container = document.getElementById("registerMap");

    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.508502, 127.074719), //지도의 중심좌표
      level: 5, //지도의 레벨(확대, 축소 정도)
    };

    //지도 생성 및 객체 리턴
    this.map = new kakao.maps.Map(container, options);

    this.displayMaker();
    this.changeType();
  };

  componentDidMount() {
    this.mapScript();
  }

  render() {
    const {
      title,
      petname,
      species,
      // sex,
      area,
      description,
      reward,
      // img,
      // latitude,
      // longitude,
      // missingDate,
    } = this.state;

    return (
      <div className="container">
        <br></br>
        <span className="logo_petRegister">
          <a href="/">
            <img src={logo_petRegister} className="registerLogo" />
          </a>
        </span>
        <br></br>
        <div className="register__title">
          <h1>
            반려동물 정보를<br></br>입력해주세요
          </h1>
        </div>
        <div id="wrap__petregister">
          <div className="petRegister">
            <div className="row">
              <div className="col-25">
                <label for="title">제목</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  className="inputTitle"
                  placeholder="제목을 입력해주세요"
                  value={title}
                  onChange={(event) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      title: event.target.value,
                    }))
                  }
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="name">이름</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  className="inputName"
                  placeholder="이름"
                  value={petname}
                  onChange={(event) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      petname: event.target.value,
                    }))
                  }
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="species">품종</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  className="inputSpecies"
                  placeholder="품종"
                  value={species}
                  onChange={(event) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      species: event.target.value,
                    }))
                  }
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="sex">성별</label>
              </div>
              <div className="col-75">
                <select
                  name="select"
                  className="inputSex"
                  onChange={(event) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      sex: event.target.value,
                    }))
                  }
                >
                  <option value="">선택</option>
                  <option value="female">암컷</option>
                  <option value="male">수컷</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="area">위치</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  className="inputArea"
                  placeholder="지도에서 선택 해주세요"
                  value={area}
                  readOnly
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="date">날짜</label>
              </div>
              <div className="col-75">
                <input
                  type="date"
                  className="inputDate"
                  onChange={(event) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      missingDate: event.target.value,
                    }))
                  }
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="reward">보상</label>
              </div>
              <div className="col-75">
                <input
                  type="number"
                  className="inputReward"
                  placeholder="보상(원)"
                  value={reward}
                  onChange={(event) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      reward: event.target.value,
                    }))
                  }
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="img">사진</label>
              </div>
              <div className="col-75">
                <input
                  type="file"
                  className="inputFile"
                  multiple
                  onChange={(event) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      img: [...event.target.files],
                    }))
                  }
                ></input>
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label for="description">상세설명</label>
              </div>
              <div className="col-75">
                <textarea
                  className="inputDescription"
                  placeholder="상세설명"
                  value={description}
                  onChange={(event) =>
                    this.setState((prevState) => ({
                      ...prevState,
                      description: event.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>
            <div className="row">
              <input
                type="submit"
                className="inputSubmit"
                value="등록하기"
                onClick={(event) => {
                  event.preventDefault();
                  this.registerPet();
                }}
              ></input>
            </div>
          </div>

          <div id="registerMap"></div>
        </div>
      </div>
    );
  }
}

export default PetRegister;
