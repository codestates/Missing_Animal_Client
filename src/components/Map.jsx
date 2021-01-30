import React from "react";
import "../styles/Map.css";
import axios from "axios";
import $ from "jquery";
/*global kakao*/
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: "",
      level: 5,
      marker: "",
      markers: [],
    };
  }
  getList = async () => {
    const res = await axios.get(
      // "http://localhost:8080/mapinfo",
      "https://missinganimals.ml/mapinfo",
      { withCredentials: true }
    );
    const { markers } = this.state;
    let map = this.state.map;
    let showMarkers = res.data.mapinfo;
    showMarkers.forEach((el) => {
      let marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.longitude, el.latitude),
      });
      let overlay = new window.kakao.maps.CustomOverlay({
        yAnchor: 3,
        position: marker.getPosition(),
      });
      markers.push(marker);
      // console.log("markers", markers);
      this.setState({ marker: marker });
      var main = document.createElement('div')
      main.style.cssText =
        'background: #333641; font-size: 13px; color: #9B9CA0; font-weight: 300; margin-bottom: -180px; width: 260px; height: 288px;'
      var title = document.createElement('div');
      title.innerHTML = '동물 정보&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;X'
      title.style.cssText = 'background:#333641; color: white; border: 1px; solid black; margin-top: 5px; border: 1px solid black;'
      title.onclick = function () {
        overlay.setMap(null);
      };
      var petImg = document.createElement('img')
      petImg.src = el.thumbnail;
      petImg.style.cssText = 'position: absolute; background: #26282F; width: 14.6rem; height: 7.7rem; margin-top: -150px;margin-left: 4px;'
      var petname = document.createElement('div');
      petname.innerHTML = '이름: ' + el.petname;
      petname.style.cssText = 'background: #26282F; display: flex; margin: 160px 9px -48px 9px;'
      var missingDate = document.createElement('div');
      missingDate.innerHTML = '날짜: ' + el.missingDate.substring(0, 10);
      missingDate.style.cssText = 'background: #26282F; margin: 5px 9px 0 9px; display: flex';
      var species = document.createElement('div');
      species.innerHTML = '품종: ' + el.species;
      species.style.cssText = 'background: #26282F; margin: 28px 9px 0 9px; display: flex'
      var reward = document.createElement('div');
      reward.innerHTML = '사례금: ' + el.reward + '원'
      reward.style.cssText = 'background: #26282F; margin: 5px 9px 0 9px; display: flex'
      var move = document.createElement('a')
      move.innerHTML = '게시판으로'
      move.href = 'https://missinganimal.ml/board'
      move.style.cssText = 'background: #26282F; color: #9B9CA0; margin: 5px 9px 0 9px; display: flex';
      // var closeBtn = document.createElement('button');
      // closeBtn.innerHTML = '닫기';
      // closeBtn.style.cssText = 'width: 40px; height: 20px; margin-left:153px; display: flex'
      main.appendChild(title)
      // main.appendChild(closeBtn);
      petname.appendChild(petImg)
      main.appendChild(petname)
      main.appendChild(missingDate)
      main.appendChild(species)
      main.appendChild(reward)
      main.appendChild(move)
      overlay.setContent(main);
      kakao.maps.event.addListener(marker, 'click', function () {
        overlay.setMap(map);
      });
    })
    // console.log("====", markers);
    this.setState({ markers: markers });
  };
  cluster() {
    // console.log("cluster", this.state.markers[0]);
    const { markers } = this.state;
    markers.forEach((el) => {
      el.setMap(null);
    });
    let map = this.state.map;
    let clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 6, // 클러스터 할 최소 지도 레벨
      // disableClickZoom: true,
      minClusterSize: 1,
    });
    // $.get("http://localhost:8080/mapinfo", function (data) {
    $.get("https://missinganimals.ml/mapinfo", function (data) {
      // 데이터에서 좌표 값을 가지고 마커를 표시합니다
      // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다
      let markers = $(data.mapinfo).map(function (i, position) {
        return new kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(
            position.longitude,
            position.latitude
          ),
        });
      });
      // 클러스터러에 마커들을 추가합니다
      clusterer.addMarkers(markers);
    });
  }
  mapScript = () => {
    console.log("script", this.state.markers);
    let container = document.getElementById("main_map");
    let options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.508502, 127.074719), //지도의 중심좌표
      // level: 6, //지도의 레벨(확대, 축소 정도)
      level: this.state.level,
    };
    //지도 생성 및 객체 리턴
    // this.map = new kakao.maps.Map(container, options);
    let map = new window.kakao.maps.Map(container, options);
    // let level = map.getLevel();
    this.setState({ map: map });
    // 처음에 레벨 5니까 오버레이 표시
    this.getList();
    kakao.maps.event.addListener(map, "zoom_changed", () => {
      var zoomLevel = map.getLevel();
      console.log("zoomLevel", zoomLevel);
      if (zoomLevel <= 5) this.getList();
      if (zoomLevel >= 6) this.cluster();
    });
    // this.cluster();
    // this.getList();
  };
  componentDidMount() {
    this.mapScript();
  }
  render() {
    // console.log("marker", this.state.marker);
    return (
      <>
        <div id="main_map"></div>
      </>
    );
  }
}
export default Map;