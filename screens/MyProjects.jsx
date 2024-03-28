import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text,Button,View, ScrollView,Image,TextInput, Pressable, FlatList, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native';
import icon from '../assets/icon.png'
import SearchTextInput from '../components/SearchQuery';
import CategoriasMenu from '../components/CategoriasMenu';
import mockavatar from '../assets/mockavatar.jpeg'
import finance from '../assets/finance.jpg'
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeProject from '../components/HomeProject';
import useAuthContext from '../hooks/useAuthContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NewPost from './NewPost';
import EditableProject from '../components/EditableProject';

const MyProjects = ({navigation}) => {
    const {getUsuario,userId,userInfo,setUserInfo,setIsnewProject} = useAuthContext()
    const [results,setResults]=useState()
    const [titulo,setTitulo]=useState("")

    const loadProjects = async()=>{
        try {
           const response = await axios.get(`http://192.168.1.35:8004/api/v1/projects/MyProjects`,)
           setResults(response.data.projects)
           
        } catch (error) {
           console.log(error)
           
        }
          
       }

     useEffect(()=>{
        loadProjects()
  
     },[])

     const filteredByTitle = titulo !==''?
    [...results].filter(el=>el.titulo.includes(titulo))
     : results

   


    
  return (
    <View style={styles.view}>
        <View style={styles.header}>
           <View style={{ flexDirection: 'row',width:'100%', alignItems: 'center', justifyContent:'center',gap:5 }}>
             <Text>¡Configura aqui tus proyectos!</Text>
           </View>
          
        </View>
        <View style={styles.searchQuery}>
           <SearchTextInput text={titulo} setText={setTitulo} />
        </View>
        {
        filteredByTitle && filteredByTitle.length>0 ? (
          <>
            <ScrollView style={{marginTop:24}}>
               {filteredByTitle.map(el=>(
                   <EditableProject navigation={navigation} key={el._id} project={el} />
               ))}
            </ScrollView>
            </>
 
         ):(
           <Text style={{marginTop:12,textAlign:'center'}}>{`No hay proyectos relacionados con este usuario`}</Text>
 
         )
      }
       
        </View>
  )
}

export default MyProjects

const styles = StyleSheet.create({
    view:{
       flex:1,
       padding:10,
       paddingTop:60
 
    },
    header:{
       display:'flex',
       flexDirection:'row',
       width:'100%',
       height:40,
       alignItems:'center',
       justifyContent:'space-between',
       zIndex:50,
 
    },
    searchQuery:{
       width:'70%',
       marginTop:20,
       marginLeft:'auto',
       marginRight:'auto'
    },
 
    searchQueryContainer: {
      backgroundColor: '#e6f2f5',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'stretch',
      height: 62,
      position: 'relative',
    },
    searchBox: {
      width: 242,
      height: 45,
      position: 'relative',
    },
    searchInput: {
      borderRadius: 10,
      width: 242,
      height: 45,
      paddingLeft: 40, // Añadido paddingLeft para el icono
      backgroundColor: '#ffffff', // Añadido para evitar superposición del icono
      position: 'absolute',
      top: 8,
      left: 0,
      borderWidth: 1,
      borderColor: '#757575',
    },
    searchIcon: {
      width: 20.89,
      height: 24,
      position: 'absolute',
      left: 10, // Ajustado para centrar verticalmente
      top: 10, // Ajustado para centrar verticalmente
      overflow: 'visible',
    },
    project:{
        height:'75%',
        marginTop:12,
        display:'flex',
        flexDirection:'column',
        padding:0,
        margin:0,
        width:'100%'
    }
  
  });