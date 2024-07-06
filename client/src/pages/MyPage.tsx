import { useEffect } from "react";
import { userStore } from "../store/user-store";
import LikedList from "../components/LikedList";

export default function MyPage() {
    const {userInfo} = userStore();

    return (
        <div className="flex w-full mt-16">
            <div className="w-[25vw] flex flex-col pl-4">
                <div className="text-lg font-semibold">My page</div>
                <div className="w-[200px] h-[0px] border border-black my-4 "/>
                <div className="mb-1"><strong>{userInfo.nickname}님. 반갑습니다. </strong></div>
            </div>
            <div className="flex w-[75vw] justify-around ">
                <LikedList />
                <div/>
            </div>
        </div>
    );
}