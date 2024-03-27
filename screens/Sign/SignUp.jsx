import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Pressable, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import crowdFunding from '../../assets/crowdFunding.webp'
import Dropdown from 'react-native-input-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import axios from 'axios';
import useAuthContext from '../../hooks/useAuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const SignUp = ({ className,setIsNewUser,isNewUser,navigation }) => {
  const {setToken,setAuthToken,setUserId}=useAuthContext()

    const INITIAL_VALUES={
        nombre:'',
        email:'',
        password:'',
        role:'',
        passwordConfirm:''
    }

    const [newUser,setNewUser]=useState(INITIAL_VALUES)
    const [secureText,setSecureText]=useState(true)

    const handleSubmitForm=async()=>{ //aquesta funcio s'ha dencargar de fer la peticio POST per a crear un nou usuari amb la info que tenim a newUser
        try {
            const response = await axios.post('http://192.168.1.35:8004/api/v1/usuarios/signup',{
                nombre:newUser.nombre,
                email:newUser.email,
                password:newUser.password,
                role:newUser.role,
                passwordConfirm:newUser.passwordConfirm
            })
            const token = (response.data.token)
            setToken(token) 
            await setAuthToken(token)
            await AsyncStorage.setItem('token',token) // persistir el token para la sesión

            setUserId(response.data.user)
            navigation.navigate('Main')



        } catch (error) {
            console.log(error)
            
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
            <TextInput value={newUser.nombre} placeholder='Nombre Usuario' onChangeText={text=>setNewUser({...newUser,nombre:text})}  
            style={styles.label}></TextInput>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput value={newUser.email} placeholder='Email' onChangeText={text=>setNewUser({...newUser,email:text})}  
            style={styles.label}></TextInput>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput  secureTextEntry={secureText} value={newUser.password} placeholder='Password' onChangeText={text=>setNewUser({...newUser,password:text})}   style={styles.label}></TextInput>
            <Pressable onPress={()=>setSecureText(!secureText)}>
              <Text>{secureText ? 'Ver contraseña' :'Ocultar'}</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput  secureTextEntry={secureText} value={newUser.passwordConfirm} placeholder='Confirm password' onChangeText={text=>setNewUser({...newUser,passwordConfirm:text})}   style={styles.label}></TextInput>
           
          </View>
        </View>
        <Dropdown
      label="Rol"
      placeholder="Elige tu rol..."
      options={[
         { label: 'Administrador', value: 'admin' },
         { label: 'Usuario', value: 'user' },
     
      ]}
      selectedValue={newUser.role}
      onValueChange={(value)=>setNewUser({...newUser,role:value})}
      primaryColor={'blue'}
    />
          <TouchableOpacity style={styles.button} onPress={handleSubmitForm}>
             <Text style={styles.registrarse}>Registrarse</Text>
          </TouchableOpacity>
        
        <Pressable style={styles.bottomText}>
          <Text style={styles.yaTienesCuenta}>Ya tienes cuenta?</Text>
          <Text onPress={()=>setIsNewUser(!isNewUser)} style={styles.iniciaSesionAqui}>Inicia sesión aquí</Text>
        </Pressable>
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
    paddingTop:5,

    width: '80%',
    alignItems: 'center',
    marginTop:-150,
    borderColor:'black',
    borderWidth:1,
    marginBottom:100,
    height:450
  },
  bienvenido: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
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
