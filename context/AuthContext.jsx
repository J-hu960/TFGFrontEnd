/* eslint-disable react/prop-types */
import AsyncStorage from "@react-native-async-storage/async-storage";
import  { createContext, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {

    const setAuthToken =async()=>{  //llamar esta funcion para añadir el token a la peticion de axios (la cridarem quan es monti en el component HOME)
        const token = await AsyncStorage.getItem('token')
        if(token){
            axios.defaults.headers.common['Authorization']=`Bearer ${token}`
        }else{
            delete axios.defaults.headers.common['Authorization'];
        }

    }

   
       

  return (
    <authContext.Provider value={{
        setAuthToken,
        }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export { authContext };
