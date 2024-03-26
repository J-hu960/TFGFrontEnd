import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import useAuthContext from '../hooks/useAuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const Profile = () => {
  const {userId,userInfo,setUserInfo} = useAuthContext()
  const [currentUser,setCurrentUser] = useState()
  if(currentUser){
    console.log(currentUser.nombre)
  }
 

  
  return (
    userInfo ?(
      <Text>{userInfo.nombre}</Text>
    ):(
      <Text>no user</Text>
    )
    
  )
}

export default Profile