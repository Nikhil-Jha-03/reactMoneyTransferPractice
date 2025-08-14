import { useNavigate } from "react-router-dom"
import { Button } from "./Button"

export const User = ({ users }) => {
    const navigate = useNavigate()
    return users.length > 0 ? (
        <div>
            {users.map((user) => (
                <div
                    key={user._id}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700">
                            U{user.id}
                        </div>
                        <span className="font-medium text-gray-800">{user.name}</span>
                    </div>

                    <button onClick={()=> navigate(`/send?id=${user._id}&name=${user.name}`) } className="bg-black text-white rounded-lg px-4 py-2 cursor-pointer transition-colors">
                        Send Money
                    </button>

                </div>
            ))}
        </div>
    )
        : (
            <h1>No User</h1>
        )
}
