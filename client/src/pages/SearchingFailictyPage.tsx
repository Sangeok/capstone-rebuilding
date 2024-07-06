import { useEffect, useState } from "react";
import { Facility, userStore } from "../store/user-store";
import { gyeonggiRegions } from "../assets/gyeonggi-regions";
import { Dropdown } from "../components/Dropdown";
import axios from "axios";
import useFacilities from "../hooks/useFacilities";
import FacilityList from "../components/FacilitysList";
import Pagination from "../components/Pagination";

export default function SearchingFacilityPage() {
    const [selectedCity, setSelectedCity] = useState<string>("시,군");
    const {
        currentFacilities,
        currentPage,
        totalPages,
        setCurrentPage
    } = useFacilities(selectedCity);

    return (
        <div className="relative flex flex-col h-screen pt-9">
            <div className="absolute inset-0 bg-slate-400 mt-[80px] ">
            </div>
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-center min-w-full">
                    <Dropdown
                        trigger={selectedCity}
                        content={gyeonggiRegions.map((region) => (
                            <button
                                onClick={()=>setSelectedCity(region.name)}
                            >
                                {region.name}
                            </button>
                        ))}
                    />
                </div>
                <FacilityList
                    currentFacilities={currentFacilities}
                    currentPage={currentPage}
                />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}