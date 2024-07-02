import { userStore } from "../store/user-store";

interface Position {
    latitude: number;
    longitude: number;
}

export function getGeoLocation() : Promise<Position>{
    return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser'));
            } else {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            (error) => {
                reject(error);
            });}
    });
}