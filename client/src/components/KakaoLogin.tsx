import kakaoPicture from "../assets/kakao.png"

export default function KakaoLogin() {
    return (
        <div>
            <img 
                className="max-w-[200px] object-contain cursor-pointer" 
                src={kakaoPicture}
                alt="카카오 로그인"
            />
        </div>
    )
}