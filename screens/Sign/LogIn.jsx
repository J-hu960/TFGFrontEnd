import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Pressable, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import crowdFunding from '../../assets/crowdFunding.webp'
import Dropdown from 'react-native-input-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignUp = ({ className,setIsNewUser,isNewUser }) => {

    const INITIAL_VALUES={
        email:'',
        password:'',
      
    }

    const [user,setUser]=useState(INITIAL_VALUES)
    const [secureText,setSecureText]=useState(true)
    const [message,setMessage] = useState(undefined)
    const [showMessage,setSHowMessage]=useState(false)

    const handleSubmitForm=async()=>{ //aquesta funcio s'ha dencargar de fer la peticio POST per a crear un nou usuari amb la info que tenim a newUser
        try {
            const response = await axios.post('http://192.168.1.35:8004/api/v1/usuarios/login',{

                email:user.email,
                password:user.password,
            })
            const token = (response.data.token)
            await AsyncStorage.setItem('token',token) // persistir el token para la sesión
            
            setMessage(`'Usuario  logeado: ${token} ` )
            setSHowMessage(true)
        } catch (error) {
            console.log(error)
            setSHowMessage(false)
            
        }

    }
 
  return (
    <SafeAreaView style={[styles.registrarseAutoLayout, className && { className }]}>
      <View style={styles.imageFrame}>
        <Image style={styles.image1} source={crowdFunding} />
      </View>
      <View style={styles.formularioFrame}>
        <Text style={styles.bienvenido}>Bienvenido!</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput value={user.email} placeholder='Email' onChangeText={text=>setUser({...user,email:text})}  
            style={styles.label}></TextInput>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput  secureTextEntry={secureText} value={user.password} placeholder='Password' onChangeText={text=>setUser({...user,password:text})}   style={styles.label}></TextInput>
            <Pressable onPress={()=>setSecureText(!secureText)}>
              <Text>{secureText ? 'Ver contraseña' :'Ocultar'}</Text>
            </Pressable>
          </View>
        </View>
        
        
          <TouchableOpacity style={styles.button} onPress={handleSubmitForm}>
             <Text style={styles.registrarse}>Registrarse</Text>
          </TouchableOpacity>
        
        <View style={styles.bottomText}>
          <Text style={styles.yaTienesCuenta}>No tienes cuenta?</Text>
          <Text onPress={()=>setIsNewUser(!isNewUser)} style={styles.iniciaSesionAqui}>Regístrate aquí</Text>
        </View>
        <Pressable>
        <Text style={{color:'red',marginTop:6}}>He olvidado mi contraseña</Text>
        </Pressable>
        {showMessage && <Text style={{marginTop:6,color:'green'}}>{message}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registrarseAutoLayout: {
    backgroundColor: '#e6f2f5',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  imageFrame:{
    width:'100%',
    height:300,
    alignItems:'center',
    
  },
  image1: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  formularioFrame: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
    marginTop:-50,
    borderColor:'black',
    borderWidth:1,
    marginBottom:100,
    height:350
  },
  bienvenido: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:8
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:6
  },
  line: {
    flex: 1,
    borderBottomColor: '#b0a7a7',
    borderBottomWidth: 1,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#b1abab',
    borderBottomWidth: 1,
    borderBottomColor: '#b1abab',
    fontSize: 16,
    paddingBottom: 5,
    width: '100%',
  },
  rolFrame: {
    backgroundColor: '#d8d7d7',
    borderRadius: 5,
    padding: 10,
    width: '60%',
    marginBottom: 20,
  },
  eligeTuRol: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6394f2',
    borderRadius: 5,
    width: '80%',
    height: 40,
    marginBottom: 20,
    color:'white',
    display:'flex',
    alignItems:'center',

  },
  registrarse: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop:7

  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yaTienesCuenta: {
    fontSize: 12,
    color: '#000000',
    marginRight: 5,
  },
  iniciaSesionAqui: {
    fontSize: 14,
    color: '#565dff',
    textDecorationLine: 'underline',
  },
});

export default SignUp;
