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
    // const res = await axios.get(
    // "http://localhost:8080/mapinfo",
    const res = await axios.get(
      "https://missinganimals.ml/mapinfo",
      { withCredentials: true }
    );
    let mapContainer = document.getElementById("main_map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.508502, 127.074719), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };
    let map = new kakao.maps.Map(mapContainer, mapOption);

    let showMarkers = res.data.mapinfo;
    showMarkers.forEach((el) => {
      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.longitude, el.latitude)
      })
    })

  };

  componentDidMount() {
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