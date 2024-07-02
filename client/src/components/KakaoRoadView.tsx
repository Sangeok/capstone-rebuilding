import { Roadview } from "react-kakao-maps-sdk"

interface kakaoRoadViewProps {
    lat: number;
    lng: number;
}

const kakaoRoadView = ({lat, lng} : kakaoRoadViewProps) => {
    return (
        <Roadview
            position={{
                lat: lat,
                lng: lng,
                radius: 50,
            }}
            style={{width: "800px", height: "400px",}}
        />
    )
}

export default kakaoRoadView;