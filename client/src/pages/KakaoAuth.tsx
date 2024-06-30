import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../store/user-store";

export default function KakaoAuth() {
    const { userInfo, setUserInfo } = userStore();
    const effectRan = useRef(false);
    const navigate = useNavigate();
    const [accessTokenFetching, setAccessTokenFetching] = useState<boolean>(false);

    const KAKAO_CODE : string | null = new URL(window.location.href).searchParams.get("code");

    const getAccessToken = async () => {
        if(accessTokenFetching) return;

        try{
            setAccessTokenFetching(true);
            const response = await axios.get(
                "http://localhost:3005/auth/kakao/callback",
                {
                    params: {
                        code: KAKAO_CODE
                    },
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            ).then((res) =>{
                console.log(res);
                localStorage.setItem("accessToken", res.data.kakaoAccessToken);
                
                setAccessTokenFetching(false);
                let userData = {
                    id : res.data.id,
                    isLogin : true,
                    nickname : res.data.nickname,
                    facilitys : res.data.facilitys,
                    accessToken : res.data.kakaoAccessToken
                }

                setUserInfo(userData);
                console.log(userData.isLogin)
                navigate("/");

            })
        } catch(err) {
            console.error(err);
            setAccessTokenFetching(false);
        }
    }

    useEffect(() => {
        if (!effectRan.current) {
            getAccessToken();
        }

        return() => {
            effectRan.current = true;
        }
    }, []);
        
    return (
        <div className="flex h-full font-bold justify-center items-center text-center text-2xl">
            Loading...
        </div>
    )
}