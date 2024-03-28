import React from 'react'
import { Button, Text,View,StyleSheet, Image, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import finance from '../assets/finance.jpg'
import mockavatar from '../assets/mockavatar.jpeg'
import * as Progress from 'react-native-progress';



export const ProjectDetails = ({navigation,route}) => {
    const {project} = route.params
    const percentage = (project.recaudacionRecibida/project.recaudacionEsperada)

  return (
    <View style={{height:'100%',width:'100%',marginTop:40,display:'flex',flexDirection:'column'}}>
      <View style={{width:'100%', display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Icon onPress={()=>navigation.navigate('Main')} name="arrow-left" size={30} color="black" />
        <Image source={mockavatar} style={{ borderRadius: 25, height: 36, width: 36 }} />
      </View>

      {/*Aquí podria ir un carroussel para todas las imagenes del los proyectos (de momento un mock.) */}
    
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

    
    </View>

  )
}

const styles = StyleSheet.create({

})
