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
      setToken(tokenStrorage)
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }

  };
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await axios.get(`http://192.168.1.35:8004/api/v1/usuarios/user`, { headers: {
          Authorization: `Bearer ${token}`,
        }},)
        setUserInfo(response.data);
      } else {
             console.log('No esta autorizado')     
           }
    } catch (error) {
      // Manejar errores de la petición
      console.log(error);
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
        setIdProject,
        loadUser
        }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export { authContext };
