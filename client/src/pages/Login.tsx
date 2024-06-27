import KakaoLogin from "../components/KakaoLogin";

export default function Login() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="space-y-4 text-center">
                <strong className="text-2xl font-bold">로그인</strong>
                <div>
                    <KakaoLogin />
                </div>
            </div>
        </div>
    );
}