import kakaoPicture from "../assets/kakao.png"

export default function KakaoLogin() {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const handleLogin = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

    return (
        <div>
            <img 
                className="max-w-[200px] object-contain cursor-pointer" 
                src={kakaoPicture}
                alt="카카오 로그인"
                onClick={()=>handleLogin()}
            />
        </div>
    )
}