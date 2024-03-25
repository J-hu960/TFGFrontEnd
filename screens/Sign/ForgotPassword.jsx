import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Pressable, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import crowdFunding from '../../assets/crowdFunding.webp'
import Dropdown from 'react-native-input-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ForgotPassword = ({ className,setIsNewUser,isNewUser,navigation }) => {

  
    const [email,setEmail]=useState()
    const [message,setMessage] = useState(undefined)
    const [showMessage,setSHowMessage]=useState(false)


    const handleSubmitForm=async()=>{ //aquesta funcio s'ha dencargar de fer la peticio POST per a crear un nou usuari amb la info que tenim a newUser
        try {
            const response = await axios.post('http://192.168.1.35:8004/api/v1/usuarios/forgotPassword',{
                email:email
            })
            setMessage('Correo enviado, usa ese codigo para cambiar tu contraseña')
            setSHowMessage(true)
            navigation.navigate('RessetPassword')
            
        } catch (error) {
            console.log(error)
            console.log(email)
            
            
        }

    }
 
  return (
    <SafeAreaView style={[styles.registrarseAutoLayout, className && { className }]}>
      <View style={styles.imageFrame}>
        <Image style={styles.image1} source={crowdFunding} />
      </View>
      <View style={styles.formularioFrame}>
        <Text style={styles.bienvenido}>Recibe un correo para cambiar tu contraseña mediante un código</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput value={email} placeholder='Email' onChangeText={text=>setEmail(text)}  
            style={styles.label}></TextInput>
          </View>
        </View>
        
        
        
          <TouchableOpacity style={styles.button} onPress={handleSubmitForm}>
             <Text style={styles.registrarse}>Enviar</Text>
          </TouchableOpacity>
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
    paddingTop:10,
    width: '80%',
    alignItems: 'center',
    marginTop:-50,
    borderColor:'black',
    borderWidth:1,
    marginBottom:100,
    height:250
  },
  bienvenido: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 'medium',
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

export default ForgotPassword;
