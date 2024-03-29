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
import useProjectsContext from '../hooks/useProjectsContext';
import defaultavatar from '../assets/defaultavatar.jpg'





const Home = ({navigation}) => {
   const {getUsuario,userId,userInfo,setUserInfo,loadUser,token} = useAuthContext()
   const { homeProjects,setHomeProjects,loadProjects,loadMasGustados,isSorting,setIsSorting} = useProjectsContext()
  const [titulo,setTitulo]=useState("")
  const [categoria,setCategoria] = useState("")
 
   
  useEffect(()=>{
      loadProjects()

  },[])

  useEffect(()=>{
   loadUser()
  },[])



    
const filteredByCategory= categoria !==''?
[...homeProjects].filter(el=>el.categoria.includes(categoria))
 : homeProjects


const filteredByTitle = titulo !==''?
    [...filteredByCategory].filter(el=>el.titulo.includes(titulo))
     : filteredByCategory




  return (
   <View style={styles.view}>
        <View style={styles.header}>
           <CategoriasMenu setFilterByCategory={setCategoria}/>
           <View style={{ flexDirection: 'row',width:'60%', alignItems: 'center', justifyContent:'flex-end',gap:5 }}>
             <Text>Bienvenido! </Text>
             <Image source={mockavatar} style={{ borderRadius: 25, height: 50, width: 50}} />
           </View>
          
        </View>
        <View style={styles.searchQuery}>
           <SearchTextInput text={titulo} setText={setTitulo} />
        </View>
        <Pressable onPress={loadMasGustados} style={{backgroundColor:'orange', width:'auto', marginLeft:'auto',marginRight:'auto',padding:5,borderRadius:10,marginTop:6,marginVertical:5}}>
           <Text>{isSorting ? 'Dejar de ordenar': 'Ordenar por los más gustados '}</Text>
        </Pressable>
          
       {
        filteredByTitle && filteredByTitle.length>0 ? (
          <>
            <ScrollView >
               {filteredByTitle.map(el=>(
                   <HomeProject userInfo={userInfo} navigation={navigation} key={el._id} project={el} />
               ))}
            </ScrollView>
            </>
 
         ):(
           <Text style={{marginTop:12,textAlign:'center'}}>{`No hay proyectos disponibles de la categoria '${categoria}' en este momento`}</Text>
 
         )

       }
        
        </View>

       
  
     //<Button onPress={()=>navigation.navigate('Auth')} title={'Back to login'}></Button >



 );
}

export default Home


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
 