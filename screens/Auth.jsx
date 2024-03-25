import { useState } from "react"
import SignUp from "./Sign/SignUp"
import LogIn from "./Sign/LogIn"

const Auth = () => {
    const [isNewUser,setIsNewUser]=useState(false)
  return (
    isNewUser ? <SignUp isNewUser={isNewUser} setIsNewUser={setIsNewUser}  /> : <LogIn isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
  )
}

export default Auth