import { GitHub } from "@mui/icons-material"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="flex justify-between items-center p-4 space-y-2">
            <div/>
            <div className="font-bold">
                COPYRIGHT 2023 BY SILVER ALL RIGHT RESERVED
            </div>
            <div>
                <Link to="https://github.com/Sangeok"><GitHub /></Link>
            </div>
        </footer>
    )
}