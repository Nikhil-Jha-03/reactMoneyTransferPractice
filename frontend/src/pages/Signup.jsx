import { useState } from "react"
import { Bottomwaring } from "../components/Bottomwaring"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import axios from "axios"
import { useNavigate } from "react-router-dom"




export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  async function handleOnClick() {

    try {
      const signupUser = await axios.post('http://localhost:3000/api/v1/user/signup', { name, email, password })
      if (signupUser) {
        localStorage.setItem("token",signupUser.data.token)
        navigate('/dashboard')
      } else {
        console.log("Not Created")
      }
    } catch (error) {
      console.log("Something Went Wrong")
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <Heading label={"Sign Up"} />
        <Subheading Subheading={"Enter your information to create an account"} />
        <form className="space-y-4">
          <Inputbox name={"Name"} type={"text"} placeholder={"Enter Name"} onChange={(e) => setName(e.currentTarget.value)} />
          <Inputbox name={"Email"} type={"email"} placeholder={"Enter Email"} onChange={(e) => setEmail(e.currentTarget.value)} />
          <Inputbox name={"Password"} type={"password"} placeholder={"Enter password"} onChange={(e) => setPassword(e.currentTarget.value)} />
          <Button type={"button"} text={" Sign Up "} onclick={handleOnClick} />
        </form>

        <Bottomwaring label={"Already have an account?"} to={"/signin"} text={"Sign in"} />
      </div>
    </div>
  )
}
