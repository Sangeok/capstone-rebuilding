import { useLocation } from "react-router-dom";
import { Facility, userStore } from "../store/user-store";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import KakaoMap from "../components/KakaoMap";
import KakaoRoadView from "../components/KakaoRoadView";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail() {
    // login 중이며 user 해당 detail 정보에 대해 찜을 했는가 여부에 따라 아이콘 변경
    let { state } = useLocation();
    const facilityInfo: Facility = state.data;
    const {userInfo} = userStore();
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(()=>{
        if(userInfo.isLogin) {
            let isLiked = userInfo.wishList.some((facility) => facility.facilityId === facilityInfo.id);
            setIsLiked(isLiked);
        }
    }, [])

    const handleLike = async () => {
        if(!userInfo.isLogin) {
            alert("로그인 후 이용해주세요.");
            return;
        }

        // 찜한 목록에 이미 있는 경우
        if(isLiked) {
            alert("이미 찜한 병원입니다.");
            return;
        }

        // 찜한 목록에 추가
        // userInfo.wishList.push(facilityInfo);
        setIsLiked(true);

        // db에 추가(user가 찜한 병원 정보를 저장, user의 찜한 병원 수를 증가)
        try {
            await axios.post(
                "http://localhost:3005/facility/like",
                {
                    facility: facilityInfo,
                    userId: userInfo.id
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        } catch(err) {
            console.log(err);
            console.log("찜하기 실패");
        }
    }

    const handleUnlike = async () => {
        // 찜한 목록에 없는 경우
        if(!isLiked) {
            alert("찜하지 않은 병원입니다.");
            return;
        }

        // 찜한 목록에서 삭제
        userInfo.wishList = userInfo.wishList.filter((facility) => facility.facilityId !== facilityInfo.BIZPLC_NM);
        setIsLiked(false);

        // db에서 삭제(user가 찜한 병원 정보를 삭제, user의 찜한 병원 수를 감소)
        try {
            await axios.post(
                "http://localhost:3005/facility/unlike",
                {
                    facility: facilityInfo,
                    userId: userInfo.id
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        } catch(err) {
            console.log(err);
            console.log("찜취소 실패");
        }
    }

    return (
        <div className="flex flex-col w-full mt-16">

            <div className="flex justify-center w-full bg-gray-100">
                <div className="flex flex-col max-w-4xl pt-12 pb-20 space-y-4">
                    <div className="flex justify-between">
                        <div className="font-bold text-3xl p-1">거리뷰</div>
                        {
                            isLiked && <AiFillHeart style={{ color: "red", fontSize: "30px" }} onClick={handleUnlike} />
                        }
                        {
                            !isLiked && <AiOutlineHeart style={{ fontSize: "30px" }} onClick={handleLike} />
                        }
                    </div>
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