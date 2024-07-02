import { useState, useEffect } from 'react';
import axios from 'axios';
import { Facility, userStore } from '../store/user-store';
import { getDistance } from '../utils/getDistance';

export default function useFacilities(selectedCity: string) {
    const {userInfo} = userStore();
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [wantFacility, setWantFacility] = useState<Facility[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const facilitiesPerPage = 3;

    console.log(userInfo);

    const fetchFacilities = async () => {
        try {
            const response = await axios.get("http://localhost:3005/facility");
            setFacilities(response.data);
        } catch (error) {
            console.error("시설 정보를 불러오는 데 실패했습니다:", error);
        }
    };

    useEffect(() => {
        fetchFacilities();
    }, []);

    const handleSelectCity = (city: string) => {
        setCurrentPage(1);

        const findFacility = facilities.filter((facility) => facility.SIGUN_NM === city);
        
        const facilitiesWithDistance = findFacility.map((facility) => ({
            ...facility,
            distance: userInfo?.myLat !== undefined && userInfo?.myLng !== undefined
                ? getDistance(userInfo.myLat, userInfo.myLng, Number(facility.REFINE_WGS84_LAT), Number(facility.REFINE_WGS84_LOGT))
                : 0 // Provide a default value here, such as 0
        }));

        const sortedFacilities = facilitiesWithDistance.sort((a, b) => a.distance - b.distance);

        if(userInfo.myLat !== undefined && userInfo.myLng !== undefined) {
            setWantFacility(sortedFacilities);
        } else {
            setWantFacility(findFacility);
        }
    };

    useEffect(() => {
        handleSelectCity(selectedCity);
    }, [selectedCity, facilities]);


    const indexOfLastFacility = currentPage * facilitiesPerPage;
    const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
    const currentFacilities = wantFacility.slice(indexOfFirstFacility, indexOfLastFacility);
    const totalPages = Math.ceil(wantFacility.length / facilitiesPerPage);

    console.log(currentFacilities);

    return {
        facilities,
        wantFacility,
        currentFacilities,
        currentPage,
        totalPages,
        handleSelectCity,
        setCurrentPage
    };
}