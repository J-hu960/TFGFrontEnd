import React, { useState,useEffect } from 'react';
import finance from '../assets/finance.jpg';
import { Text, Button, View, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import axios from 'axios';

const HomeProject = ({ project,navigation,userInfo }) => {
  const [likes, setLikes] = useState(project.likes);
  const [dislikes, setDislikes] = useState(project.dislikes);
  const [hasLikedYet,setHasLikedYet] =useState()
  const [hasDislikedYet,setHasDislikedYet] =useState()


  useEffect(() => {
    if(userInfo){
      setHasLikedYet(userInfo.proyectosLikeados.includes(project._id));
      setHasDislikedYet(userInfo.proyectosDislikeados.includes(project._id));

    }
   

  }, [userInfo, project]);

  const handleLikeButton = async () => {

    if (!hasLikedYet){
      console.log('+1')
      try {
        await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}/likes`,{
          data:{
            likes:likes+1,
            action:'like'
          }
        });

        await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/updateMyLikes',{
          data:{
            proyectoLikeado:project._id,
            action:'like'
          }
        })
        setHasLikedYet(true)
        setLikes(prev=>prev+1);
        
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    }else{
      try {
        await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}/likes`,{
          data:{
            likes:likes-1,
            action:'unlike'
          }
        });

        await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/updateMyLikes',{
          data:{
            proyectoLikeado:project._id,
            action:'unlike'
          }
        })
        setLikes(prev=>prev-1);
        setHasLikedYet(false)

        console.log('-1')
        
      } catch (error) {
        console.error("Error updating likes:", error);
      }
 
    }

    if(hasDislikedYet){
      try {
        await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}/dislikes`,{
          data:{
            dislikes:dislikes-1,
            action:'undislike'
          }
        });

        await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/updateMyDislikes',{
          data:{
            proyectoDilikeado:project._id,
            action:'undislike'
          }
        })
        setDislikes(prev=>prev-1);
        setHasDislikedYet(false)

        console.log('-1')
        
      } catch (error) {
        console.error("Error updating likes:", error);
      }

    }

   
  };
  const handleDislikeButton = async () => {

    if (!hasDislikedYet){
      console.log('+1')
      try {
        await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}/dislikes`,{
          data:{
            dislikes:dislikes+1,
            action:'dislike'
          }
        });

        await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/updateMyDislikes',{
          data:{
            proyectoDislikeado:project._id,
            action:'dislike'
          }
        })
        setHasDislikedYet(true)
        setDislikes(prev=>prev+1);
        
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    }else{
      try {
        await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}/dislikes`,{
          data:{
            dislikes:dislikes-1,
            action:'undislike'
          }
        });

        await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/updateMyDislikes',{
          data:{
            proyectoLikeado:project._id,
            action:'undislike'
          }
        })
        setDislikes(prev=>prev-1);
        setHasDislikedYet(false)

        console.log('-1')
        
      } catch (error) {
        console.error("Error updating likes:", error);
      }
 
    }

    if(hasLikedYet){
      try {
        await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${project._id}/likes`,{
          data:{
            likes:likes-1,
            action:'unlike'
          }
        });

        await axios.patch('http://192.168.1.35:8004/api/v1/usuarios/updateMyLikes',{
          data:{
            proyectoLikeado:project._id,
            action:'unlike'
          }
        })
        setLikes(prev=>prev-1);
        setHasLikedYet(false)

        console.log('-1')
        
      } catch (error) {
        console.error("Error updating likes:", error);
      }

    }

   
  };

  //Volem veure  el project._id esta dins l'array de proyectosLikeados de l'usuari
 

  
   
  const handleGoDetailsPage=()=>{
    navigation.navigate('ProjectDetails',{project:project})
  }

  const handleGoAddReviewPage=()=>{
    navigation.navigate('ReviewForm',{project:project,user:userInfo})
  }
  


  return (
    <View style={styles.project}>
      <View style={{ display: 'flex', flexDirection: 'row', height: 34, width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 16, fontWeight: '100' }}>{project.categoria}</Text>
        <Text style={{ fontSize: 16, fontWeight: '100' }}>{project.createdBy?.nombre}</Text>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: 'bold', textDecorationLine: 'underline' }}>{project.titulo}</Text>
      <View style={{ width: '100%', height: 'auto', marginTop: 12 }}>
        <Text>{project.descripcion}</Text>
      </View>
      <Image source={finance} style={{ borderRadius: 5, height: 200, width: 'auto', marginTop: 6 }} />
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ marginTop: 6, fontSize: 20 }}>{likes}</Text>
          <Pressable onPress={handleLikeButton}>
            <Icon name="thumb-up" size={30} color={hasLikedYet ? "green" : "black"} />
          </Pressable>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ marginTop: 6, fontSize: 20 }}>{dislikes}</Text>
          <Pressable onPress={handleDislikeButton}> 
            <Icon name="thumb-down" size={30} color={hasDislikedYet ? "#FF0000" : "black"} />
          </Pressable>
        </View>
        <Pressable onPress={handleGoDetailsPage} style={{ backgroundColor: '#6394F2', height: 30, width: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Saber Más</Text>
        </Pressable>
      </View>
      <Pressable onPress={handleGoAddReviewPage} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:6}}>
      <Text style={{color:'orange'}}>Añadir reseña</Text>
      </Pressable>
      
    </View>
  );
};

export default HomeProject;

const styles = StyleSheet.create({
  project: {
    height: 'auto',
    marginTop: 6,
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    margin: 0,
    width: '100%',
    marginVertical:12,
    backgroundColor:'white'
  },
});
