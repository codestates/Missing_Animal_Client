import React from 'react';
import "../styles/Map.css";
require('dotenv').config()
// const kakao_url = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}`
const kakao_url = process.env.KAKAO_MAP_KEY

/*global kakao*/

class Map extends React.Component {

  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = kakao_url;

    document.head.appendChild(script);

    script.onload = () => {
      kakao.maps.load(() => {
        var container = document.getElementById("map");
        var options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7
        };

        var map = new window.kakao.maps.Map(container, options);// eslint-disable-line no-unused-vars

        var marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(37.468669, 126.951323), // 마커의 좌표
          map: map // 마커를 표시할 지도 객체
        });

        kakao.maps.event.addListener(marker, 'click', function () {
          alert('마커를 클릭했습니다!');
        });
      });
    };
  }
  render() {
    return (
      <>
        <div id="map">
        </div>
      </>
    )
  }
}



export default Map;