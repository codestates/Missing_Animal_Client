import React from 'react';
// import React, { useEffect } from 'react';
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
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7
        };

        const map = new window.kakao.maps.Map(container, options);

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
          // 클릭한 위치에 마커를 표시합니다 
          addMarker(mouseEvent.latLng);
        });

        // 지도에 표시된 마커 객체를 가지고 있을 배열입니다
        var markers = [];

        // 마커 하나를 지도위에 표시합니다 
        addMarker(new kakao.maps.LatLng(33.450701, 126.570667));

        // 마커를 생성하고 지도위에 표시하는 함수입니다
        function addMarker(position) {

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            position: position
          });

          // 마커가 지도 위에 표시되도록 설정합니다
          marker.setMap(map);

          // 생성된 마커를 배열에 추가합니다
          markers.push(marker);
        }
        // kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

        //   // 클릭한 위도, 경도 정보를 가져옵니다 
        //   let latlng = mouseEvent.latLng

        //   // 마커 위치를 클릭한 위치로 옮깁니다
        //   markers.setPosition(latlng)

        //   let message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, '
        //   message += '경도는 ' + latlng.getLng() + ' 입니다'
        //   console.log(message)

        //   let resultDiv = document.getElementById('clickLatlng')
        //   resultDiv.innerHTML = message
        // })
        // console.log(markers)
        // 배열에 추가된 마커들을 지도에 표시하거나 삭제하는 함수입니다
        function setMarkers(map) {
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
          }
        }


        // "마커 보이기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에 표시하는 함수입니다
        function showMarkers() {
          setMarkers(map)
        }

        // "마커 감추기" 버튼을 클릭하면 호출되어 배열에 추가된 마커를 지도에서 삭제하는 함수입니다
        function hideMarkers() {
          setMarkers(null);
        }
      });
    };
  }
  render() {
    return (
      <>
        <div id="map">
          <div id="clickLatlng"></div>
        </div>
      </>
    )
  }
}



export default Map;