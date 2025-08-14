function Navbar({user}) {
    return (
        <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50">
            <h1 className="text-xl font-bold text-gray-800">Payments App</h1>
            <div className="flex items-center space-x-3">
                <span className="text-gray-700">Hello, {user}</span>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm text-gray-600">
                    U
                </div>
            </div>
        </div>
    )
}

export {Navbar};