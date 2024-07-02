import { useLocation } from "react-router-dom";
import { Facility } from "../store/user-store";
import KakaoMap from "../components/KakaoMap";
import KakaoRoadView from "../components/KakaoRoadView";

export default function Detail() {
    let { state } = useLocation();
    const facilityInfo: Facility = state.data;

    return (
        <div className="flex flex-col w-full mt-16">

            <div className="flex justify-center w-full bg-gray-100">
                <div className="flex flex-col max-w-4xl pt-12 pb-20 space-y-4">
                    <div className="font-bold text-3xl p-1">거리뷰</div>
                    <KakaoRoadView lat={Number(facilityInfo.REFINE_WGS84_LAT)} lng={Number(facilityInfo.REFINE_WGS84_LOGT)}/>
                    <hr className="border-none h-0.5 bg-gray-800 my-5 shadow-inner"/>
                    <ul className="list-none space-y-2">
                        <li className="font-bold text-3xl pb-1">
                            {facilityInfo.BIZPLC_NM}
                        </li>
                        <li className="font-thin pb-1">
                            주소 : {facilityInfo.REFINE_LOTNO_ADDR}
                        </li>
                    </ul>
                    <hr className="border-none h-0.5 bg-gray-800 my-5 shadow-inner"/>
                    <div className="font-bold text-3xl p-1">위치</div>
                    <KakaoMap lat={Number(facilityInfo.REFINE_WGS84_LAT)} lng={Number(facilityInfo.REFINE_WGS84_LOGT)}/>
                </div>
            </div>
        </div>
    );
}