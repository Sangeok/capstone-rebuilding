import { useState } from "react";
import { Facility } from "../store/user-store";
import axios from "axios";

export default function useGetSearchFacilities(SearchTerm: string) {
    const [wantFacility, setWantFacility] = useState<Facility[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const facilitiesPerPage = 3;

    const handleSearch = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            try {
                const res = await axios.post(
                    "http://localhost:3005/facility/search",
                    {
                        search: SearchTerm
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                console.log(res);
                setWantFacility(res.data);
            } catch(err) {
                console.log(err);
                console.log("검색 실패");
            }
          }
    }

    const indexOfLastFacility = currentPage * facilitiesPerPage;
    const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
    const currentFacilities = wantFacility.slice(indexOfFirstFacility, indexOfLastFacility);
    const totalPages = Math.ceil(wantFacility.length / facilitiesPerPage);

    return {
        currentFacilities,
        currentPage,
        totalPages,
        setCurrentPage,
        handleSearch
    }
}