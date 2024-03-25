import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text,Button,View, ScrollView,Image,TextInput } from 'react-native'
import { StyleSheet } from 'react-native';
import icon from '../assets/icon.png'
import SearchTextInput from '../components/SearchQuery';
import CategoriasMenu from '../components/CategoriasMenu';
import mockavatar from '../assets/mockavatar.jpeg'

const Home = ({navigation}) => {
  const [results,setResults]=useState()
  const [titulo,setTitulo]=useState()
  const loadProjects = async()=>{
    const response = await axios.get('http://192.168.1.35:8004/api/v1/comunidades')
    setResults(response.data.communities)
  }
  useEffect(()=>{
     loadProjects()
  },[])
  return (
     <View style={styles.view}>
        <View style={styles.header}>
           <CategoriasMenu/>
           <View style={{ flexDirection: 'row',width:'60%', alignItems: 'center', justifyContent:'flex-end',gap:5 }}>
             <Text>Hola Jordi</Text>
             <Image source={mockavatar} style={{ borderRadius: 25, height: 36, width: 36 }} />
           </View>
         
        </View>
        <View style={styles.searchQuery}>
           <SearchTextInput text={titulo} setText={setTitulo} />
            </View>
     </View>
  
     //<Button onPress={()=>navigation.navigate('Auth')} title={'Back to login'}></Button >



 );
    { /**<View>
        {results && results.length>0 ? (
           <ScrollView>
              {results.map(el=>(
                  <View key={el._id}>
                  <Text>{el.name}</Text>
                  </View>
              ))}
           </ScrollView>

        ):(<></>

        )}
     </View> <View style={styles.searchQueryContainer}> search query
       <View style={styles.searchBox}>
         <Image
           source={icon}
           style={styles.searchIcon}
         />
         <TextInput
           style={styles.searchInput}
           placeholder="Buscar..."
           placeholderTextColor="#757575"
         />
       </View>
     </View>*/}
    
  
}

export default Home

const styles = StyleSheet.create({
   view:{
      height:'100',
      width:'100%',
      padding:10,
      paddingTop:60

   },
   header:{
      display:'flex',
      flexDirection:'row',
      width:'100%',
      height:40,
      alignItems:'center',
      justifyContent:'space-between'

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
 
 });
 