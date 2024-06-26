import React, { useEffect, useState } from 'react'
import { Text,StyleSheet, View, Pressable, Image, ScrollView, TextInput,Alert } from 'react-native'
import useAuthContext from '../hooks/useAuthContext'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import mockavatar from '../assets/mockavatar.jpeg'
import * as ImagePicker from 'expo-image-picker';
import {  ref, uploadBytes,getStorage,getDownloadURL  } from "firebase/storage";
import { storage } from '../firebase';

const Profile = ({navigation}) => {
  const {userId,userInfo,setUserInfo,token,setToken} = useAuthContext()
  const [isEditing,setIsEditing]=useState(false)
  if(userInfo){
    console.log(userInfo)
  }

  const handleChangeProfilePicture=async()=>{
    try {
      const formData = new FormData()
      formData.append('photo',{
        uri: userInfo.photo,
        type: 'image/jpg', // Cambia el tipo MIME según el tipo de archivo que estés enviando
        name: 'photo.jpg' // 
      })
      await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/upload-photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Asegúrate de establecer el tipo de contenido como 'multipart/form-data'
        }
      });
    } catch (error) {
      console.log(error)
      
    }
  }


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri);

    if (!result.canceled) {
      setUserInfo({
        ...userInfo,
       photo: result.assets[0].uri});
    }
    //await handleChangeProfilePicture()
  };

  const subirImagenFirebase = async (rutaArchivo, nombreArchivo) => {
    try {
      // Crear una referencia al archivo en Firebase Storage
      const referenciaArchivo = ref(storage, 'fotoPerfiles/' + nombreArchivo);
  
      // Subir la imagen como un archivo
      await uploadBytes(referenciaArchivo, rutaArchivo);
  
      console.log('Imagen subida exitosamente a Firebase Storage');
    } catch (error) {
      console.error('Error al subir la imagen a Firebase Storage:', error);
    }
  };

  const cargarFotoPerfil = async () => {
    try {
      const referenciaFotoPerfil = ref(getStorage(), `fotoPerfiles/${userId}.png`);

      //  la URL de descarga de la foto de perfil
      const urlFotoPerfil = await getDownloadURL(referenciaFotoPerfil);

      // Establecer la URL de la foto de perfil en el estado
      setUserInfo({
        ...userInfo,
        photo:urlFotoPerfil.split('?')[0]
      });
    } catch (error) {
      // Manejar el error en caso de que la foto de perfil no exista o haya algún otro problema
      console.error('Error al cargar la foto de perfil:', error);
    }
  };

  


 
  useEffect(()=>{
    cargarFotoPerfil()
  },[])



const handleChangeUserInfo=async()=>{
    try {
      await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/updateMe',{
        email:userInfo.email,
        nombre:userInfo.nombre,
        descripcion:userInfo.descripcion,
    })
    setIsEditing(false)
    console.log(userInfo.photo)
    Alert.alert('Usuario Actualizado')
    subirImagenFirebase(userInfo.photo,`${userId}${userInfo.photo.split('.')[1]}`)

        
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
      
      <Image source={{ uri:userInfo.photo}} style={{ borderRadius: 25, height: 160, width: 180 }} />

      {isEditing ? (
        <>
         <Pressable onPress={pickImage}  style={{marginTop:12}}>
         <Text style={{textAlign:'center',color:'#225AC8',fontWeight:'semibold'}}>Cambiar foto de perfil</Text>
       </Pressable>
      </>):<>
       <Pressable onPress={setIsEditing(true)} style={{marginTop:12,color:'black'}}>
         <Text style={{ textAlign: 'center', fontWeight: 'semibold' }}>Editar perfil</Text>
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
  
    
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },

})