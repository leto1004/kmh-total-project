import { useEffect } from "react";
import styled from "styled-components";
import useWeather from "../hooks/useWeather";
const { kakao } = window;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const KakaoMap = () => {
  const { location } = useWeather();

  useEffect(() => {
    const container = document.getElementById("map"); // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(location.lat, location.long), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    };

    const map = new kakao.maps.Map(container, options);
    // Create a marker
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(location.lat, location.long), // 마커의 위치
    });
    // To add the marker to the map, call setMap();
    marker.setMap(map);
  }, [location]);
  
  return (
    <div>
      <MapContainer id="map"></MapContainer>
    </div>
  );
};

export default KakaoMap;