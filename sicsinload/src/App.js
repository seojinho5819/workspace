import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [ mylocation , setMyLocation ] = useState({lat : 37.2803486,lng : 127.118456})
  const { naver } = window;
  const HOME_PATH = window.HOME_PATH || '.';
  


  useEffect(()=>{
    const location = naver && new naver.maps.LatLng(37.2803486, 127.118456);
  // 지도에 표시할 위치의 위도와 경도 설정

  const mapOptions = {
  center: location,
  // 중앙에 배치할 위치
  zoom: 14,
  // 확대 단계
  };
  const map = naver && new naver.maps.Map('map', mapOptions);

  

  // DOM 요소에 지도 삽입 (지도를 삽입할 HTML 요소의 id, 지도의 옵션 객체)
  const marker = new naver.maps.Marker({
    map,
    position: mylocation,
    icon: {
      url : './img/mylocationicon18.jpg',
      //content: '<img src="'+ HOME_PATH +'/img/mylocationicon18.jpg" alt="noContent" >',
      size: new naver.maps.Size(50, 52),
      anchor: new naver.maps.Point(25, 26)
    }
  });
  // 지도에 마커(내위치) 생성
  let circle = new naver.maps.Circle({
    map: map,
    center: mylocation,
    radius: 500,
    fillOpacity: 0.8
});
  // 마커(나) 이동
  naver.maps.Event.addListener(map, 'click', function(e) {
    setMyLocation(e.latlng.y,e.latlng.x)
    marker.setPosition(e.coord);
    circle.setCenter({y:e.latlng.y,x: e.latlng.x})

    //const mapLatLng = new naver.maps.LatLng(e.coord);

    // 선택한 마커로 부드럽게 이동합니다.
    map.setZoom(14)
    map.panTo(e.coord, {duration:300 ,easing:'linear'});
  
    });
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  

  

  return (
    <div className="App">
      
        <div id="map"/>
    
    </div>
  );
}

export default App;
