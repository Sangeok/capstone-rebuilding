import { Link } from "react-router-dom";
import { Facility } from "../store/user-store";

interface FacilityListProps {
    currentFacilities: Facility[];
    currentPage: number;
}

export default function FacilityList({ currentFacilities, currentPage }: FacilityListProps) {
    return (
        <div className="flex flex-col pt-2">
            {currentFacilities && currentFacilities.map((facility,i) => (
                <div key={facility.id} className="flex justify-center">
                    <div className="flex rounded-md shadow-xl w-1/2 shadow-gray-500  bg-white m-2 p-2 space-x-2">
                        <div className="font-bold">{(currentPage*3)+i-2}</div>
                        <div className="space-y-1">
                            <div>시설 이름 : {facility.BIZPLC_NM}</div>
                            <div className="pb-1">시설 주소 : {facility.REFINE_ROADNM_ADDR}</div>
                            <Link to={`/Searching/${facility.id}`} className="text-blue-600 underline" state={{ data: facility }}>자세히 보기...</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}