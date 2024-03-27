import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Button, Pressable, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import crowdFunding from '../assets/crowdFunding.webp'
import axios from 'axios';

const UpdatePassword = ({navigation}) => {
    const [secureText,setSecureText]=useState(true)
    const [request,setRequest] = useState()

    const handleUpdatePassword=async()=>{

        try {
            await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/updateMyPassword', {
                data: {
                    passwordCurrent:request.passwordCurrent,
                    newPassword: request.newPassword,
                    passwordConfirm:request.passwordConfirm
                  }
        });
            navigation.navigate('Main');
          
        } catch (error) {
                console.log(error);
                console.log(request)
         }
        
    }

  return (
    <View style={styles.registrarseAutoLayout}>
      <View style={styles.imageFrame}>
        <Image style={styles.image1} source={crowdFunding} />
      </View>
      <View style={styles.formularioFrame}>
        <Text style={styles.bienvenido}>Rellene el formulario para actualizar su contraseña</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput onChangeText={(text=>setRequest({
                ...request,
                passwordCurrent:text
            }))}   secureTextEntry={secureText}  placeholder='Contraseña actual'  style={styles.label}></TextInput>
            <Pressable onPress={()=>setSecureText(prev=>!prev)} >
              <Text>{secureText ? 'Ver contraseña' :'Ocultar'}</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput   secureTextEntry={secureText} onChangeText={(text=>setRequest({
                ...request,
                newPassword:text
            }))} placeholder='Nueva contraseña'  style={styles.label}></TextInput>
          
          </View>
        </View><View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput   secureTextEntry={secureText} onChangeText={(text=>setRequest({
                ...request,
                passwordConfirm:text
            }))} placeholder='Confirmar nueva contraseña'  style={styles.label}></TextInput>
            
          </View>
        </View>
       
          <TouchableOpacity onPress={handleUpdatePassword}  style={styles.button}>
             <Text style={styles.registrarse}>Cambiar contraseña</Text>
          </TouchableOpacity>

        
        
              </View>
    </View>
  
  )
}

export default UpdatePassword

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
      height:320
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
      backgroundColor: 'blue',
      borderRadius: 5,
      width: 'auto',
      height: 40,
      marginBottom: 20,
      color:'white',
      display:'flex',
      alignItems:'center',
      padding:2
  
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