import React, { useState } from 'react'
import finance from '../assets/finance.jpg'
import { Text,Button,View, ScrollView,Image,TextInput, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import axios from 'axios'


const HomeProject = ({project}) => {
  const [hasLiked,setHasLiked]=useState(false)
  const [hasDisliked,setHasDisliked]=useState(true)

  const handleLikeButton = async () => {
    if(hasLiked) return
    try {
      await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}`, { likes: project.likes + 1 });
      setHasLiked(prev => true);
      
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  
  const handleDislikeButton = async () => {
    try {
      await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}`, { dislikes: project.dislikes + 1 });
      setHasLiked(prev => false);
      setHasDisliked(prev => true);
    } catch (error) {
      console.error("Error updating dislikes:", error);
    }
  };
  
     
  return (
    <View style={styles.project}>
             <View style={{display:'flex',flexDirection:'row',height:34,width:'100%',alignItems:'center',justifyContent:'space-between'}}>
               <Text style={{fontSize:16,fontWeight:'100'}}>{project.categoria}</Text>
               <Text style={{fontSize:16,fontWeight:'100'}}>{project.autor}</Text>
             </View>
             <Text style={{textAlign:'center',fontSize:24,fontWeight:'bold',textDecorationLine:'underline'}}>{project.titulo}</Text>
             <View style={{width:'100%', height:'auto',marginTop:12}}>
                <Text >{project.descripcion}</Text>
             </View>
              <Image source={finance} style={{ borderRadius: 5, height:200, width: 'auto',marginTop:6 }} />
              <View style={{display:'flex',flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',marginTop:6}}>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:6}}>
                  <Text style={{marginTop:6,fontSize:20}}>{project.likes}</Text>
                  <Pressable onPress={handleLikeButton}>
                   <Icon name="thumb-up" size={30} color="green" />
                   </Pressable>
                </View>
                <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:6}}>
                  <Text style={{marginTop:6,fontSize:20}}>{project.dislikes}</Text>
                  <Pressable onPress={handleDislikeButton}>
                    <Icon name="thumb-down" size={30} color="#FF0000" />
                  </Pressable>
                   
                </View>
                <Pressable  style={{backgroundColor:'#6394F2',height:30,width:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:'white',fontWeight:'bold'}}>Saber Más</Text>
                </Pressable>
              </View>

        </View>
  )
}

export default HomeProject


const styles = StyleSheet.create({
  
    project:{
        height:400,
        marginTop:6,
        display:'flex',
        flexDirection:'column',
        padding:0,
        margin:0,
        width:'100%'
    }
  
  });
  