import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="absolute font-bold flex justify-between w-full p-4 z-10">
            <div className="">
                <Link className="" to="/">Home</Link>
            </div>

            <div>
                <Link to="/login">Login</Link>
            </div>
        </nav>
    );
}