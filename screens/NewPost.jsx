import React, { useEffect, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import useAuthContext from '../hooks/useAuthContext'
import Dropdown from 'react-native-input-select';
import axios from 'axios';




const NewPost = ({navigation,route}) => {
  let editingProject;
  if(route.params?.editingProject)editingProject = route.params.editingProject

  const {userInfo} = useAuthContext()

     let INITIAL_VALUES
     if(route.params?.editingProject){
      INITIAL_VALUES={
        titulo:editingProject.titulo||'',
        descripcion:editingProject.descripcion||'',
        recaudacionEsperada:editingProject.recaudacionEsperada||undefined,
        categoria:editingProject.categoria||'',
        recaudacionRecibida:editingProject.recaudacionRecibida.toString()||0,
        autor:userInfo.email,
        createdAt:editingProject.createdAt||undefined,
        likes:editingProject.likes||0,
        dislikes:editingProject.dislikes||0,
        fechaLimite:editingProject.fechaLimite||undefined,
        linkWeb:editingProject.linkWeb||''
      }


     }else{
      INITIAL_VALUES={
        titulo:'',
        descripcion:'',
        recaudacionEsperada:undefined,
        categoria:'',
        recaudacionRecibida:0,
        autor:userInfo.email,
        createdAt:undefined,
        likes:0,
        dislikes:0,
        fechaLimite:undefined,
        linkWeb:''
      }

     }
    


  const [newProject,setNewProject]=useState(INITIAL_VALUES)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const handleCreateProject=async()=>{
    if(route.params?.editingProject){
      try {
        await axios.patch(`http://192.168.1.35:8004/api/v1/projects/${route.params.editingProject._id}`,{
           data:{
             newProject
           }
         })
         console.log('Proyecto Actualizado')
         route.params={}
         setNewProject({
          titulo:'',
          descripcion:'',
          recaudacionEsperada:undefined,
          categoria:'',
          recaudacionRecibida:0,
          autor:userInfo.email,
          createdAt:undefined,
          likes:0,
          dislikes:0,
          fechaLimite:undefined,
          linkWeb:''
         })
         navigation.navigate('Home')
   
         
       } catch (error) {
         console.log(error)
         
       }

    }else{
       try{
          await axios.post(`http://192.168.1.35:8004/api/v1/projects`,{
           data:{
             newProject
           }
         })
         console.log('Proyecto creado')
         setNewProject({
          titulo:'',
          descripcion:'',
          recaudacionEsperada:undefined,
          categoria:'',
          recaudacionRecibida:0,
          autor:userInfo.email,
          createdAt:undefined,
          likes:0,
          dislikes:0,
          fechaLimite:undefined,
          linkWeb:''
         })
         navigation.navigate('Home')
   
         
       } catch (error) {
         console.log(error)
         
       }}

    }


  return (
    <View style={styles.page}>
          <View style={{width:'100%',display:'flex',flexDirection:'column'}}>
            <Text style={{textAlign:'center'}}>¡Hola, {userInfo.nombre}!</Text>
            <Text style={{textAlign:'center',marginTop:12,fontSize:16,fontWeight:'bold'}}>Cuéntanos más sobre tu proyecto</Text>
          </View>
          <ScrollView style={styles.form}>
             
                 <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                       <TextInput onChangeText={text=>setNewProject({
                        ...newProject,
                        titulo:text
                       })}  value={newProject.titulo} placeholder='Titulo'  
                         style={styles.label}></TextInput>
                    </View>
                 </View>
                 <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                       <TextInput onChangeText={text=>setNewProject({
                        ...newProject,
                        linkWeb:text
                       })}  value={newProject.linkWeb} placeholder='Link de tu web o de interés'  
                         style={styles.label}></TextInput>
                    </View>
                 </View>
                 <Text style={{marginTop:16}}>Descripción:</Text>
                 <View style={styles.textAreaContainer} >
                    <TextInput onChangeText={text=>setNewProject({
                        ...newProject,
                        descripcion:text
                       })}  value={newProject.descripcion} editable={true}
                     style={styles.textArea}
                     underlineColorAndroid="transparent"
                     placeholder='Esta será la carta de presentación...'
                     placeholderTextColor="grey"
                     numberOfLines={10}
                     multiline={true}
                  />
             
               </View>

               <Dropdown 
                  placeholder="Elige una categoría..."
                  options={[
                    { label: 'Tecnología', value: 'tech' },
                    { label: 'Innovación', value: 'innovacion' },
     
                    ]}
                    selectedValue={newProject.categoria}
                    onValueChange={(value)=>setNewProject({...newProject,categoria:value})} 
                    primaryColor={'blue'}
                />
                 <View style={{display:'flex',flexDirection:'column',gap:6}}>
                   <Text>Recaudación esperada:</Text>
                   <TextInput value={newProject.recaudacionEsperada} onChangeText={text=>setNewProject({...newProject,recaudacionEsperada:text})} style={styles.numericInput} keyboardType="numeric" />
                </View> 
                
                <Button title='Subir foto del proyecto'></Button>   

                 <View style={{display:'flex',flexDirection:'column',gap:6,width:'100%',alignItems:'center'}}>
                 <TouchableOpacity onPress={handleCreateProject} style={styles.button} >
                     <Text style={styles.registrarse}>Guardar</Text>
                 </TouchableOpacity>
                 </View>

               

            </ScrollView>


    </View>

  )
}

export default NewPost

const styles = StyleSheet.create({
  page:{
    marginTop:45,  
    paddingHorizontal:5,
    height:'100%',
    width:'100%',
    flex:1
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop:6
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
  form:{
    width:'100%',
    display:'flex',
    flex:1,
    flexDirection:'column',
    paddingHorizontal:10,
    paddingVertical:16,
    marginTop:16,
    backgroundColor:'white'

  },
  textAreaContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 5,
    width:'100%',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:12
  },
  textArea: {
    height: 150,
    justifyContent: "flex-start",
    alignItems:'flex-start'
  
  },
  numericInput:{
    borderColor:'gray',
    borderWidth:1,
    width:'60%',
    height:26
  },
  button: {
    backgroundColor: '#6394f2',
    borderRadius: 5,
    width: '70%',
    height: 40,
    marginTop: 10,
    color:'white',
    display:'flex',
    alignItems:'center',
    marginBottom:12

  },
  registrarse: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop:7

  },
})