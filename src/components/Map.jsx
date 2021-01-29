import React from "react";
import "../styles/Map.css";
import axios from "axios";
import $ from "jquery"
/*global kakao*/
class Map extends React.Component {

  getList = async () => {
    const res = await axios.get(
    "http://localhost:8080/mapinfo",
      // "https://missinganimals.ml/mapinfo",
      { withCredentials: true }
    );
    let mapContainer = document.getElementById("main_map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.555047, 126.973517), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      };
    let map = new kakao.maps.Map(mapContainer, mapOption);

    let showMarkers = res.data.mapinfo;
    // console.log(showMarkers)

    showMarkers.forEach((el) => {
      let marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.longitude, el.latitude)
      })
      let overlay = new window.kakao.maps.CustomOverlay({
        yAnchor: 3,
        position: marker.getPosition()
      });

      // let map2 = new kakao.maps.Map(document.getElementById('main_map'), { // 지도를 표시할 div
      //   center: new kakao.maps.LatLng(37.555055, 126.973520), // 지도의 중심좌표 
      //   level: 3 // 지도의 확대 레벨 
      // });

      // let clusterer = new kakao.maps.MarkerClusterer({
      //   map: map2, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
      //   averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
      //   minLevel: 6 // 클러스터 할 최소 지도 레벨 
      // });

      // $.get("http://localhost:8080/mapinfo", function (data) {
      //   // $.get("https://missinganimals.ml/mapinfo", function (data) {
      //   // 데이터에서 좌표 값을 가지고 마커를 표시합니다
      //   // 마커 클러스터러로 관리할 마커 객체는 생성할 때 지도 객체를 설정하지 않습니다

      //   let markers = $(data.mapinfo).map(function (i, position) {
      //     return new kakao.maps.Marker({
      //       position: new window.kakao.maps.LatLng(position.longitude, position.latitude)
      //     });
      //   });

      //   // 클러스터러에 마커들을 추가합니다
      //   clusterer.addMarkers(markers);
      // });


      var main = document.createElement('div')
      main.style.cssText =
        'background: #333641; font-size: 13px; color: #9B9CA0; font-weight: 300; margin-bottom: -175px; width: 260px; height: 288px;'

      var title = document.createElement('span');
      title.innerHTML = '동물 정보(클릭시 꺼짐)'
      title.style.cssText = 'background:#333641; color: white; border: 1px; solid black; margin-top: 5px; border: 1px solid black;'
      title.onclick = function () {
        overlay.setMap(null);
      };

      var petImg = document.createElement('img')
      petImg.src = el.thumbnail;
      petImg.style.cssText = 'background: #26282F; width: 235px; height: 115px; margin-top: -150px;margin-left: -50px;'

      var petname = document.createElement('div');
      petname.innerHTML = '이름: ' + el.petname;
      petname.style.cssText = 'background: #26282F; display: flex; margin-left: 9px; margin-right: 9px; margin-top: 160px; margin-bottom: -48px;';

      var missingDate = document.createElement('div');
      missingDate.innerHTML = '날짜: ' + el.missingDate.substring(0, 10);
      missingDate.style.cssText = 'background: #26282F; margin-left: 9px; margin-top: 5px; margin-right: 9px; display: flex';

      var species = document.createElement('div');
      species.innerHTML = '품종: ' + el.species;
      species.style.cssText = 'background: #26282F; margin-left: 9px; margin-top: 31px; margin-right: 9px; display: flex'

      var reward = document.createElement('div');
      reward.innerHTML = '사례금: ' + el.reward + '원'
      reward.style.cssText = 'background: #26282F; margin-left: 9px; margin-top: 5px; margin-right: 9px; display: flex'

      var move = document.createElement('a')
      move.innerHTML = '게시판으로'
      move.href = 'https://missinganimal.ml/board'
      move.style.cssText = 'background: #26282F; color: #9B9CA0; margin-left: 9px; margin-top: 5px; margin-right: 9px; display: flex';

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

  };


  componentDidMount() {
    this.getList();
    // this.getCluster();
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
