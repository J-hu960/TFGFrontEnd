import { useState } from "react"
import SignUp from "./Sign/SignUp"
import LogIn from "./Sign/LogIn"

const Auth = ({navigation}) => {
    const [isNewUser,setIsNewUser]=useState(false)
  return (
    isNewUser ? <SignUp navigation={navigation} isNewUser={isNewUser} setIsNewUser={setIsNewUser}  /> : <LogIn navigation={navigation} isNewUser={isNewUser} setIsNewUser={setIsNewUser} />
  )
}

export default Auth