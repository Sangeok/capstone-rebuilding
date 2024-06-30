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
    accessToken : string;
}

interface UserStoreType {
    userInfo : UserType;
    setUserInfo : (userInfo : UserType) => void;
}

const defaultUserState = {
    id : "",
    isLogin : false,
    nickname : "",
    facilitys : [],
    accessToken : "",
}

export const userStore = create<UserStoreType>((set) => ({
    userInfo : defaultUserState,
    setUserInfo : (userInfo : UserType) => {set({userInfo})},
}));