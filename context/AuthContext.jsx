/* eslint-disable react/prop-types */
import AsyncStorage from "@react-native-async-storage/async-storage";
import  { createContext, useState } from "react";
import axios from "axios";
const authContext = createContext();

const AuthProvider = ({ children }) => {
   const [userId,setUserId] = useState()
   const [userInfo,setUserInfo] = useState()
   const [token,setToken] = useState()
   const [idProject,setIdProject]=useState('')

   const setAuthToken = async () => {
    const tokenStrorage = await AsyncStorage.getItem('token');
    if (tokenStrorage) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${tokenStrorage}`;
      setToken(token)
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
        setUserInfo,
        token,
        setToken,
        idProject,
        setIdProject
        }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export { authContext };
