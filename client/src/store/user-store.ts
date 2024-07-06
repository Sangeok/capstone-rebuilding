import { create } from "zustand";

export interface Facility {
    id : string;
    SIGUN_CD : string;
    SIGUN_NM : string;
    BIZPLC_NM : string;
    REFINE_ROADNM_ADDR : string; 
    REFINE_LOTNO_ADDR : string;
    REFINE_ZIP_CD : string;
    REFINE_WGS84_LAT : string;
    REFINE_WGS84_LOGT : string;
    LikedNumber : number;
    distanceWithUser? : number;
}

interface UserType {
    id : string;
    isLogin : boolean;
    nickname : string;
    wishList : wishListType[];
    accessToken : string;
    myLocation? : string;
    myLat? : number;
    myLng? : number;
}

interface wishListType {
    id : string;
    userId : string;
    facilityId : string;
}

interface UserStoreType {
    userInfo : UserType;
    setUserInfo : (userInfo : UserType) => void;
    setMyLocation : (myLocation : string) => void;
    setUserUnlikedFacility : (facilityId : string) => void;
}

const defaultUserState = {
    id : "",
    isLogin : false,
    nickname : "",
    wishList : [],
    myLocation : "",
    accessToken : "",
}

export const userStore = create<UserStoreType>((set) => ({
    userInfo : defaultUserState,
    setUserInfo: (newUserInfo: UserType) => {
        set((state) => ({
            userInfo: {
                ...newUserInfo,
                myLocation: state.userInfo.myLocation
            }
        }))
    },
    setMyLocation: (myLocation: string) => {
        set((state) => ({
            userInfo: { ...state.userInfo, myLocation }
        }))
    },
    setUserUnlikedFacility: (facilityId: string) => {
        set((state) => ({
            userInfo: {
                ...state.userInfo,
                wishList: state.userInfo.wishList.filter((facility) => facility.facilityId !== facilityId)
            }
        }))
    }
}));