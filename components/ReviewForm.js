import React, { useEffect, useState } from 'react'
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import useAuthContext from '../hooks/useAuthContext'
import Dropdown from 'react-native-input-select';
import axios from 'axios';
import useProjectsContext from '../hooks/useProjectsContext';
import Icon from 'react-native-vector-icons/FontAwesome';




const ReviewForm = ({ navigation, route }) => {
    const {user,project} = route.params

   const [review,setReview]=useState()
   const handleInputChange = (value) => {
    setReview(value);
  }

  const handleEnviarReview =async()=>{
    if(review!==''){
        try {
            console.log('subiendo...')
            await axios.post(`http://192.168.1.35:8004/api/v1/projects/${project._id}/reviews`,{
                data:{
                    descripcion:review.trim(),
                    userid:user._id

                }
               
              });
            
        } catch (error) {
             console.log(error)
        }
    }
  }

 
  return (
    <View style={styles.page}>
         <View style={{width:'100%', display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Icon onPress={()=>navigation.navigate('Main')} name="arrow-left" size={30} color="black" />
      </View>
      <View style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center' }}>¡Hola, {user.nombre}!</Text>
        <Text style={{ textAlign: 'center', marginTop: 12, fontSize: 14, fontWeight: 'bold' }}>Con tu comentario puedes ayudar a futuros usuario</Text>
      </View>
      <ScrollView style={styles.form}>
       
        
        <Text style={{ marginTop: 16 ,marginBottom:10}}>Que te ha parecido el proyecto?</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            onChangeText={text => handleInputChange(text)}
            value={review}
            editable={true}
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder='Escribe tu opinión sobre el proyecto'
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </View>
         <Pressable onPress={handleEnviarReview} style={{backgroundColor:'orange',width:'50%',marginLeft:'auto',marginRight:'auto',padding:4}}>
            <Text style={{color:'white',fontWeight:'bold',textAlign:'center'}}>Enviar</Text>
         </Pressable>
    
      </ScrollView>
    </View>
  )
}

export default ReviewForm

const styles = StyleSheet.create({
  page: {
    marginTop: 65,
    paddingHorizontal: 5,
    height: '100%',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 6
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#b1abab',
    fontSize: 16,
    paddingBottom: 5,
    width: '100%',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height:'auto',
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginTop: 16,
 
  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 5,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 12
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    alignItems: 'flex-start'
  },


 
})
