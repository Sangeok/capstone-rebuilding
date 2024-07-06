import { useEffect, useState } from "react";
import { Facility, userStore } from "../store/user-store";
import axios from "axios";
import { Link } from "react-router-dom";

import { MdOutlineCancel } from "react-icons/md";

export default function WishListTable() {
    const {userInfo, setUserUnlikedFacility} = userStore();
    const [wishListArr, setWishListArr] = useState<Facility[]>([]);

    const handleUnlike = async (facilityId: string) => {
        try {
            await axios.post(
                "http://localhost:3005/facility/unlike",
                {
                    facilityId: facilityId,
                    userId: userInfo.id
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            setWishListArr(wishListArr.filter((facility) => facility.id !== facilityId));
            setUserUnlikedFacility(facilityId);
        } catch(err) {
            console.log(err);
            console.log("찜 취소 실패");
        }
    }


    useEffect(()=>{
        const fetchWishList = async () => {
            try {
                const response = await axios.post(
                    "http://localhost:3005/facility/wishList",
                    { wishListData: userInfo.wishList },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                console.log(response);
                setWishListArr(response.data);
            } catch(err) {
                console.log(err);
                console.log("WishList fetching 실패");
            }
        }
        if(userInfo.wishList) {
            console.log(userInfo.wishList);
            fetchWishList();
        }
    }, [])

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            시설 이름
                        </th>
                        <th scope="col" className="px-6 py-3">
                            도로명 주소
                        </th>
                        <th scope="col" className="px-6 py-3">
                            관심 시설 취소
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        wishListArr && wishListArr.map((item,index)=>{
                            return (
                                // state로 주는 item이 camping 용품 사이트에 올라온 item의 state와 동일해야겠네
                                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <Link to={`/Searching/${item.id}`} state={{item : item}}>{item.BIZPLC_NM}</Link>
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.REFINE_ROADNM_ADDR}
                                    </td>
                                    <td className="px-6 py-4">
                                        <MdOutlineCancel
                                            className="cursor-pointer text-xl"
                                            onClick={()=>handleUnlike(item.id)}
                                        />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}