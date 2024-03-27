import React, { useEffect, useState } from 'react'
import { Text,StyleSheet, View, Pressable, Image, ScrollView, TextInput,Alert } from 'react-native'
import useAuthContext from '../hooks/useAuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import mockavatar from '../assets/mockavatar.jpeg'
const Profile = ({navigation}) => {
  const {userId,userInfo,setUserInfo,token,setToken} = useAuthContext()
  const [isEditing,setIsEditing]=useState(false)
  const handleChangeUserInfo=async()=>{
    try {
      await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/updateMe',{
        email:userInfo.email,
        nombre:userInfo.nombre,
        descripcion:userInfo.descripcion
  
    })
    setIsEditing(false)
    Alert.alert('Usuario Actualizado')
    

      
    } catch (error) {
      console.log(error)
      
    }
  
  }
  
const handleLogOut =async()=>{
  try {
    await AsyncStorage.removeItem('token')
  setToken('')
  setUserInfo('')
  console.log('token eliminado')
  console.log(token)
  navigation.navigate('Auth')
    
  } catch (error) {
    console.log(error)
    
  }
}

const handleClickEliminarCuanta=async()=>{
  navigation.navigate('DeleteAccount')

}

  return (
    <View style={{marginTop:50,paddingHorizontal:10, display:'flex',flexDirection:'column',alignItems:'center',flex:1}}>
    <View style={{width:'100%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
    <Pressable onPress={handleLogOut} >
        <Text style={{textDecorationLine:'underline',marginTop:10}}>Cerrar sesión</Text>
      </Pressable>
      <Pressable onPress={()=>navigation.navigate('UpdatePassword')} style={{marginTop:12}}>
         <Text style={{textDecorationLine:'underline'}}>Cambiar contraseña</Text>
       </Pressable>
    </View>
      
      <Image source={mockavatar} style={{ borderRadius: 25, height: 160, width: 180}} />
      {isEditing ? (
         <Pressable  style={{marginTop:12}}>
         <Text style={{textAlign:'center',color:'#225AC8',fontWeight:'semibold'}}>Cambiar foto de perfil</Text>
       </Pressable>
      ):<>
       <Pressable onPress={setIsEditing(true)} style={{marginTop:12}}>
         <Text  style={{textAlign:'center',fontWeight:'semibold'}}>Editar perfil</Text>
       </Pressable>
      </>}
    
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }} style={{ backgroundColor: 'white', width: '100%', marginTop: 12, borderRadius: 10,marginHorizontal:20 }}>
      <View style={styles.inputContainer}> 
        <View style={styles.inputWrapper}>
           <Text style={{marginLeft:16}}>Nombre de usuario:</Text>
          <TextInput editable={isEditing} value={userInfo.nombre}  onChangeText={text=>setUserInfo({
            ...userInfo,
            nombre:text
          })}
           placeholder={userInfo.nombre}  
          style={styles.label}></TextInput>
        </View>
    
        <View style={styles.inputWrapper}>
           <Text style={{marginLeft:16}}>Email:</Text>
          <TextInput editable={isEditing} onChangeText={text=>setUserInfo({
            ...userInfo,
            email:text
          })}
           placeholder={userInfo.email}  
          style={styles.label}></TextInput>
        </View>
      </View>
      <Text style={{marginLeft:34,textAlign:'left',width:'100%'}}>Descripción:</Text>
      <View style={styles.textAreaContainer} >
           <TextInput editable={isEditing}
             onChangeText={text=>setUserInfo({
              ...userInfo,
              descripcion:text
            })}
             style={styles.textArea}
             underlineColorAndroid="transparent"
             placeholder={userInfo.descripcion}
             placeholderTextColor="grey"
             numberOfLines={5}
             multiline={true}
             />
       </View>
       <Pressable onPress={handleChangeUserInfo} style={{marginTop:12,backgroundColor:'blue'}}>
         <Text  style={{textAlign:'center',fontWeight:'semibold',color:'white',padding:5}}>Guardar cambios</Text>
       </Pressable>
      
        
       <Pressable onPress={handleClickEliminarCuanta} style={{marginVertical:12,backgroundColor:'red',padding:5}}>
         <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Eliminar cuenta</Text>
       </Pressable>
      </ScrollView>
    </View>
    
  )
}

export default Profile

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    alignItems:'flex-start',
    display:'flex',
  },
  inputWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop:6,
    width:'60%',
    padding:5
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#b1abab',
    borderWidth: 1,
    borderColor: '#b1abab',
    fontSize: 16,
    paddingBottom: 5,
    width: '100%',
    borderRadius:5,
    paddingLeft:5
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 5,
    width:'90%',
    marginLeft:'auto',
    marginRight:'auto'
    
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
    alignItems:'flex-start'
  
    
  }

})