import { Map, MapMarker } from "react-kakao-maps-sdk";

interface kakaoMapProps {
    lat: number;
    lng: number;
}

const kakaoMap = ({lat, lng}: kakaoMapProps) => {

    return (
        <Map
          center={{ lat: lat, lng: lng }}
          style={{ width: "800px", height: "400px" }}
        >
          <MapMarker position={{ lat: lat, lng: lng }}>
          </MapMarker>
        </Map>
    )
}

export default kakaoMap;