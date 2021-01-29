import React from "react";
import "../styles/Map.css";
import axios from "axios";
import $ from "jquery"
// import GetAddress from "./GetAddress";
/*global kakao*/
class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  getList = async () => {
    const res = await axios.get(
    // "http://localhost:8080/mapinfo",
      "https://missinganimals.ml/mapinfo",
      { withCredentials: true }
    );
    let mapContainer = document.getElementById("main_map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.555047, 126.973517), // 지도의 중심좌표
        level: 5, // 지도의 확대 레벨
      };
    let map = new kakao.maps.Map(mapContainer, mapOption);

    let showMarkers = res.data.mapinfo;
    console.log(showMarkers)

    showMarkers.forEach((el) => {
      var marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(el.longitude, el.latitude)
      })
      var overlay = new kakao.maps.CustomOverlay({
        yAnchor: 3,
        position: marker.getPosition()
      });




      var main = document.createElement('div')
      main.style.cssText =
        'background: #FFD22E; font-size: 15px; border-radius: 15%; font-weight: bold; border: 4px solid black; margin-bottom: -84px; width: 200px; height: 140px;'

      var title = document.createElement('button');
      title.innerHTML = '동물 정보(클릭시 꺼짐)'
      title.style.cssText = 'background:#ffc107; border: 1px; solid black; text-align: center; border: 1px solid black;'
      title.onclick = function () {
        overlay.setMap(null);
      };

      var petImg = document.createElement('img')
      petImg.src = el.thumbnail;
      petImg.style.cssText = 'background: #FFD22E; width: 50px; height: 65px; margin-top: 10px;margin-left: 80px;'

      var petname = document.createElement('div');
      petname.innerHTML = '이름: ' + el.petname;
      petname.style.cssText = 'background: #FFD22E; display: flex; margin-left: 2px; margin-bottom: -55px;';

      var missingDate = document.createElement('div');
      missingDate.innerHTML = '날짜: ' + el.missingDate.substring(0, 10);
      missingDate.style.cssText = 'background: #FFD22E; margin-left: 2px; display: flex';

      var species = document.createElement('div');
      species.innerHTML = '품종: ' + el.species;
      species.style.cssText = 'background: #FFD22E; margin-left: 2px; display: flex'

      var reward = document.createElement('div');
      reward.innerHTML = '사례금: ' + el.reward;
      reward.style.cssText = 'background: #FFD22E; margin-left: 2px; display: flex'

      var move = document.createElement('a')
      move.innerHTML = '게시판으로'
      move.href = 'https://missinganimal.ml/board'
      move.style.cssText = 'background: #FFD22E; margin-left: 2px; display: flex';

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
