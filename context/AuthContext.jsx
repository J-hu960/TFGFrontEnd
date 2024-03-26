/* eslint-disable react/prop-types */
import AsyncStorage from "@react-native-async-storage/async-storage";
import  { createContext, useState } from "react";
import axios from "axios";
const authContext = createContext();

const AuthProvider = ({ children }) => {
   const [userId,setUserId] = useState()
   const [userInfo,setUserInfo] = useState()

   const setAuthToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };
  
  return (
    <authContext.Provider value={{
        setAuthToken,
        setUserId,
        userId,
        userInfo,
        setUserInfo
        }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export { authContext };
