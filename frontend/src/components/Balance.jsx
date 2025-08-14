import React from 'react'

export const Balance = ({balance}) => {
    return (
        <div className="px-6 py-4">
            <p className="text-lg font-semibold text-gray-800">
                Your Balance:{" "}
                <span className="text-green-600 font-bold">Rs {balance}</span>
            </p>
        </div>
    )
}
