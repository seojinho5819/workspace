import { useEffect, useState } from 'react';
import './App.css';
import logo from './asset/mylocationicon18.jpg'


function App() {
  const [ mylocation , setMyLocation ] = useState({lat : 37.2803486,lng : 127.118456})
  const { naver } = window;

  


  useEffect(async()=>{
    const location = naver && new naver.maps.LatLng(37.2803486, 127.118456);
  // 지도에 표시할 위치의 위도와 경도 설정

  const mapOptions = {
  center: location,
  // 중앙에 배치할 위치
  zoom: 14,
  // 확대 단계
  };
  const map = naver && new naver.maps.Map('map', mapOptions);

  
  await fetch('/v1/search/local.json?query=%EC%A3%BC%EB%B3%80%EC%9D%8C%EC%8B%9D%EC%A0%90&display=5',{
    method: 'GET', // *GET, POST, PUT, DELETE 등
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, 
    headers: {
      'Content-Type': 'application/json',
      'X-Naver-Client-Id' : 'DJGnZ7vQFrDYjIvc57PY',
      'X-Naver-Client-Secret' : 'FQXmywEPSO'
    },
  }) .then((res) => {
    return res.json(); //Promise 반환
  })
  .then((json) => {
      console.log(json); // 서버에서 주는 json데이터가 출력 됨
  });

  // DOM 요소에 지도 삽입 (지도를 삽입할 HTML 요소의 id, 지도의 옵션 객체)
  let marker = new naver.maps.Marker({
    map,
    position: mylocation,
    icon: {
      url : logo,
      scaledSize: new naver.maps.Size(50, 68),
      anchor: naver.maps.Point(23, 40)
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
