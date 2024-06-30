import { Link } from "react-router-dom";
import { userStore } from "../store/user-store";

export default function NavBar() {
    const {userInfo} = userStore();


    return (
        <nav className="absolute font-bold flex justify-between w-full p-4 z-10">
            <div className="">
                <Link className="" to="/">Home</Link>
            </div>
            <div className="flex space-x-6">
                <div>
                    <Link to="/Searching">Searching</Link>
                </div>
                {
                    userInfo.isLogin ? (
                        <div>
                            <Link to="/logout">Logout</Link>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Login</Link>
                        </div>
                    )
                }
            </div>
        </nav>
    );
}