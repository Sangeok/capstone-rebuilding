import { create } from "zustand";

interface Facility {
    id : string;
    SIGUN_CD : string;
    SIGUN_NM : string;
    BIZPLC_NM : string;
    REFINE_ROADNM_ADDR : string; 
    REFINE_LOTNO_ADDR : string;
    REFINE_ZIP_CD : string;
    REFINE_WGS84_LAT : string;
    REFINE_WGS84_LOGT : string;
}

interface UserType {
    id : string;
    isLogin : boolean;
    nickname : string;
    facilitys : Facility[];
    myLocation? : string;
    accessToken : string;
}

interface UserStoreType {
    userInfo : UserType;
    setUserInfo : (userInfo : UserType) => void;
    setMyLocation : (myLocation : string) => void;
}

const defaultUserState = {
    id : "",
    isLogin : false,
    nickname : "",
    facilitys : [],
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
    }
}));