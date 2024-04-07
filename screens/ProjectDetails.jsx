import React, { useEffect, useState } from 'react'
import { Button, Text,View,StyleSheet, Image, Pressable, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import finance from '../assets/finance.jpg'
import mockavatar from '../assets/mockavatar.jpeg'
import * as Progress from 'react-native-progress';
import axios from "axios";



export const ProjectDetails = ({navigation,route}) => {
    const {project} = route.params
    const [showReviews,setShowReviews] = useState(false)
    const [reviews,setReviews]=useState()
    const percentage = (project.recaudacionRecibida/project.recaudacionEsperada)
    const loadReviews = async()=>{
      try {
         const response = await axios.get(`http://192.168.1.35:8004/api/v1/projects/${project._id}/reviews`)
         setReviews(response.data.data)
         console.log(response.data.data)
         
      } catch (error) {
         console.log(error)   
      }  
     }
     const handleMostrarOpiniones =()=>{
      setShowReviews(prev=>!prev)
     }

     useEffect(()=>{
       loadReviews()
     },[project._id])

  return (
    <ScrollView style={{height:'auto',width:'100%',marginTop:40,display:'flex',flexDirection:'column',flex:1}}>
      <View style={{width:'100%', display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Icon onPress={()=>navigation.navigate('Main')} name="arrow-left" size={30} color="black" />
        <Image source={mockavatar} style={{ borderRadius: 25, height: 36, width: 36 }} />
      </View>

      {/*Aquí podria ir un carroussel para todas las imagenes del los proyectos (de momento un mock.) */}
       <Pressable onPress={handleMostrarOpiniones} style={{marginLeft:12,marginTop:5}}>
          <Text style={{color:'#26619c'}}>{showReviews ? 'Ocultar opiniones': ' Mostrar opiniones'}</Text>
       </Pressable>
      <Image source={finance} style={{  height: 200, width: '100%',marginTop:20 }} />
       <View style={{width:'100%', display:'flex',flexDirection:'row',gap:12,alignItems:'center',justifyContent:'center',marginTop:6}}>
         <Icon name="long-arrow-left" size={30} color="black" />
         <Icon name="long-arrow-right" size={30} color="black" />
       </View>
        <Text style={{fontSize:20,fontWeight:'bold',textAlign:'center'}}>{project.titulo}</Text>
        <View style={{width:'100%', display:'flex',flexDirection:'column',marginLeft:12,gap:12,alignItems:'flex-start',marginTop:12}}>
          
           <Text >Dinero recaudado: {project.recaudacionRecibida}</Text>
           <Text >Dinero recaudado: {project.recaudacionEsperada}</Text>

        </View>
        <View style={{width:'100%', display:'flex',flexDirection:'column',gap:12,alignItems:'center',marginTop:12}}>
           <Progress.Pie progress={percentage} size={100} />
           <Text>{percentage*100}% financiado!</Text>
           <Text style={{color:'red'}}>{(project.recaudacionEsperada-project.recaudacionRecibida)}€  restante</Text>
           <Pressable style={{width:'70%',backgroundColor:'#0050EC',padding:10}}>
           <Text style={{color:'white',textAlign:'center',fontSize:24,fontWeight:'semibold'}}>Co-Financiar</Text>
           </Pressable>


        </View>
       
        {showReviews && reviews &&reviews.length>0 ?(
              <View style={{height:'auto',minHeight:200,idth:'100%', display:'flex',marginTop:12,padding:10,backgroundColor:'white',paddingBottom:20,paddingHorizontal:20,rowGap:10}}>
                    <Text style={{textAlign:'center',fontSize:20}}>Reseñas:</Text>
                    {reviews.map((el,idx)=>(
                     <View style={{width:'100%',height:'auto',display:'flex',flexDirection:'column',alignItems:'flex-start'}} key={el._id}>
                       <Text style={{textDecorationLine:'underline'}}>{idx+1}. {el.createdBy.nombre}</Text>
                       <Text style={{color:'#00004d'}}>{el.descripcion}</Text>
                        
                     </View>
                    ))}

              </View>
        ):(
          <></>
        )}

    
    </ScrollView>

  )
}

const styles = StyleSheet.create({

})
