import React from "react"
import { Bottomwaring } from "../components/Bottomwaring"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Subheading } from "../components/Subheading"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export const Signin = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const navigate = useNavigate()

  async function handleSigninClick() {
    console.log("first")
    try {
      const signinUser = await axios.post('http://localhost:3000/api/v1/user/login', { email, password })
      console.log(signinUser)
      if (signinUser.status == 200) {
        console.log("Here")
        localStorage.setItem("token", signinUser.data.token)
        navigate('/dashboard')
      } else {
        console.log(signinUser.data)
      }
      console.log(signinUser.data.msg)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">

        <Heading label={"Sign in"} />
        <Subheading Subheading={"Enter your information to login to your account"} />
        <form className="space-y-4">
          <Inputbox name={"Email"} type={"email"} placeholder={"Enter Email"} onChange={(e)=>setEmail(e.currentTarget.value)} />
          <Inputbox name={"Password"} type={"password"} placeholder={"Enter password"} onChange={(e)=> setPassword(e.currentTarget.value)} />
          <Button type={"button"} text={" Sign in "} onclick={handleSigninClick} />
        </form>

        <Bottomwaring label={"Don't have an account?"} to={"/signup"} text={"Sign up"} />
      </div>
    </div>
  )
}
