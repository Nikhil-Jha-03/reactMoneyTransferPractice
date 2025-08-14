export const Button = ({ text, type, onclick }) => {
    return (
        <button
            onClick={onclick}
            type={type}
            className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
            {text}
        </button>
    )
}
