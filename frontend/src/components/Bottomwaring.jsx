import { Link } from "react-router-dom"

export const Bottomwaring = ({ label, to, text }) => {
    return (
        <div className="text-center text-sm text-gray-500 mt-4">
            {label}{" "}
            <Link to={to} className="text-black font-medium hover:underline">
                {text}
            </Link>
        </div>
    )
}
