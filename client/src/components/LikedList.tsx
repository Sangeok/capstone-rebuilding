import { userStore } from "../store/user-store";
import WishListTable from "./WishListTable";

export default function LikedList() {
    const {userInfo} = userStore();

    return (
        <div className="flex flex-col pr-4">
            <div>
                <strong>관심 시설</strong>
            </div>
             {
                userInfo?.wishList.length === 0 ? 
                <div className="flex w-full pt-16">
                    <strong>현재 관심 있는 시설이 없습니다.</strong>
                </div> : <WishListTable/>
             }
        </div>
    )
}