import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export const SendMoney = () => {
  const [searchParams] = useSearchParams()
  const toId = searchParams.get("id")
  const name = searchParams.get("name")
  const [amount, setAmount] = useState(0)
  const navigate = useNavigate();

  async function handletransfer() {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/account/transfer', {
        amount: amount,
        to: toId
      }, {
        headers: { Authorization: `bearer ${localStorage.getItem("token")}` }
      })

      if (response.status == 200) {
        console.log(response.data.msg)
        navigate('/dashboard')
      }
      console.log(response)
      console.log(response.data.msg)
    } catch (error) {
      console.log(error.response?.data?.msg || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Send Money</h1>

        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold text-lg">
            {name.charAt(0).toUpperCase()}
          </div>
          <span className="font-semibold text-lg">{name}</span>
        </div>

        <label className="block text-gray-600 text-sm text-left mb-2">
          Amount (in Rs)
        </label>
        <input
          onChange={(e) => setAmount(e.currentTarget.value)}
          type="number"
          placeholder="Enter amount"
          className="w-full border rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-pink-800"
        />

        <button onClick={handletransfer} className="w-full bg-pink-600 text-white font-medium rounded-lg py-2 transition">
          Initiate Transfer
        </button>
      </div>
    </div>
  )
}
