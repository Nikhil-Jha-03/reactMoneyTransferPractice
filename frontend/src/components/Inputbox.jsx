export const Inputbox = ({ name, type, placeholder, onChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700">
                {name}
            </label>
            <input
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                className="mt-1 w-full mb-6 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
        </div>
    )
}
