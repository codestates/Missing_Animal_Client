import React from "react";
import "../styles/Map.css";
import axios from "axios";
// import GetAddress from "./GetAddress";
/*global kakao*/
class Map extends React.Component {
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
  getList = async () => {
    const res = await axios.get(
      // "http://localhost:8080/mapinfo",
        "https://missinganimals.ml/mapinfo",
      { withCredentials: true }
    );
    // console.log(res.data.mapinfo)
    const showMarkers = res.data.mapinfo;
    let mapContainer = document.getElementById("main_map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.508502, 127.074719), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };
    let map = new kakao.maps.Map(mapContainer, mapOption);
    console.log("showMarkers", showMarkers[0].longitude, showMarkers[0].latitude);

    // const positions = [
    //   {
    //     title: "카카오",
    //     latlng: new kakao.maps.LatLng(showMarkers[0].longitude, showMarkers[0].latitude)
    //   },
    //   {
    //     title: "생태연못",
    //     latlng: new kakao.maps.LatLng(showMarkers[1].longitude, showMarkers[1].latitude)
    //   },
    //   {
    //     title: "아몰랑",
    //     latlng: new kakao.maps.LatLng(showMarkers[2].longitude, showMarkers[2].latitude)
    //   },
    // ];
    // for (let i = 0; i < positions.length; i++) {
    //   // 마커를 생성합니다
    //   let marker = new kakao.maps.Marker({
    //     map: map, // 마커를 표시할 지도
    //     title: positions[i].title,
    //     position: positions[i].latlng, // 마커를 표시할 위치
    //   });
    //   marker.setMap(map);
    // }
  };

  componentDidMount() {
    // this.mapScript();
    this.getList();
  }
  render() {
    return (
      <>
        <div id="main_map"></div>
      </>
    );
  }
}
export default Map;