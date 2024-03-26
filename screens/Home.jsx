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



const Home = ({navigation}) => {
   const {getUsuario,userId,userInfo,setUserInfo} = useAuthContext()
  const [results,setResults]=useState()
  const [titulo,setTitulo]=useState("")
  const [categoria,setCategoria] = useState("")
  const [isSorting,setIsSorting]=useState(false)
   if(userId)console.log(userId)
   
   const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await axios.get(`http://192.168.1.35:8004/api/v1/usuarios/user`, { headers: {
            Authorization: `Bearer ${token}`,
          }},)
          setUserInfo(response.data);
        } else {
               console.log('No esta autorizado')     
             }
      } catch (error) {
        // Manejar errores de la petición
        console.log(error);
      }
    };
  const loadProjects = async()=>{
   try {
      const response = await axios.get(`http://192.168.1.35:8004/api/v1/projects`)
      setResults(response.data.projects)
      
   } catch (error) {
      console.log(error)
      
   }
     
  }

  const loadMasGustados=async()=>{
    if(isSorting){
      loadProjects()
      setIsSorting(false)
      return
    }
    try {
      const response = await axios.get(`http://192.168.1.35:8004/api/v1/projects?sort=-likes,createdAt`)
      setResults(response.data.projects)
      setIsSorting(true)
      
   } catch (error) {
      console.log(error)
      
   }
  }


  useEffect(()=>{
      loadProjects()
  },[])

  useEffect(()=>{
   loadUser(userId)
  },[])


  if(categoria){
    console.log(categoria)
    console.log(results)}


    
const filteredByCategory= categoria !==''?
[...results].filter(el=>el.categoria.includes(categoria))
 : results


const filteredByTitle = titulo !==''?
    [...filteredByCategory].filter(el=>el.titulo.includes(titulo))
     : filteredByCategory




  return (
     <View style={styles.view}>
        <View style={styles.header}>
           <CategoriasMenu setFilterByCategory={setCategoria}/>
           <View style={{ flexDirection: 'row',width:'60%', alignItems: 'center', justifyContent:'flex-end',gap:5 }}>
             <Text>Bienvenido! {userInfo ? userInfo.nombre : 'noUSer'}</Text>
             <Image source={mockavatar} style={{ borderRadius: 25, height: 36, width: 36 }} />
           </View>
          
        </View>
        <View style={styles.searchQuery}>
           <SearchTextInput text={titulo} setText={setTitulo} />
        </View>
        <Pressable onPress={loadMasGustados} style={{backgroundColor:'orange', width:'auto', marginLeft:'auto',marginRight:'auto',padding:5,borderRadius:10,marginTop:6,marginBottom:0}}>
           <Text>{isSorting ? 'Dejar de ordenar': 'Ordenar por los más gustados '}</Text>
        </Pressable>
          
        {filteredByTitle && filteredByTitle.length>0 ? (
         <>
           <ScrollView style={{paddingHorizontal:18,marginTop:10}}  >
              {filteredByTitle.map(el=>(
                  <HomeProject key={el._id} project={el} />
              ))}
           </ScrollView>
           </>

        ):(
          <Text style={{marginTop:12,textAlign:'center'}}>{`No hay proyectos disponibles de la categoria '${categoria}' en este momento`}</Text>

        )}
        
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
 