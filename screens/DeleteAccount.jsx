import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Button, Pressable, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import crowdFunding from '../assets/crowdFunding.webp'
import useAuthContext from '../hooks/useAuthContext';
import axios from 'axios';
const DeleteAccount = ({navigation}) => {
    const {userInfo} = useAuthContext()
    const [secureText,setSecureText]=useState(true)
    const [password,setPassword]=useState()

    const handleDeleteAccount = async () => {
        try {
            await axios.delete('http://192.168.1.35:8004/api/v1/usuarios/deleteMe', {
                data: {
                    password: password 
                }
            });
            navigation.navigate('Auth');
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
    <View style={styles.registrarseAutoLayout}>
      <View style={styles.imageFrame}>
        <Image style={styles.image1} source={crowdFunding} />
      </View>
      <View style={styles.formularioFrame}>
        <Text style={styles.bienvenido}>Inserte su contraseña para borrar la cuenta</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput onChangeText={text=>setPassword(text)}  secureTextEntry={secureText}  placeholder='Password'  style={styles.label}></TextInput>
            <Pressable onPress={()=>setSecureText(!secureText)}>
              <Text>{secureText ? 'Ver contraseña' :'Ocultar'}</Text>
            </Pressable>
          </View>
        </View>
       
        
          <TouchableOpacity onPress={handleDeleteAccount} style={styles.button}>
             <Text style={styles.registrarse}>Borrar</Text>
          </TouchableOpacity>

        
        
              </View>
    </View>
  
)}

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
    backgroundColor: 'red',
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
    paddingTop:7,


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


export default DeleteAccount