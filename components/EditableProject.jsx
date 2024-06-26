import { View,Text,Image, Pressable } from "react-native"
import finance from '../assets/finance.jpg'
import useAuthContext from "../hooks/useAuthContext"
import axios from "axios"
import useProjectsContext from "../hooks/useProjectsContext"

const EditableProject = ({project,navigation}) => {
   const {setIdProject} = useAuthContext()
   const {loadMyProjects,loadProjects} = useProjectsContext()
   const handleEditButton=()=>{
      setIdProject(project._id)
      navigation.navigate('NewPost',{editingProject:project})
     }

     const handleDeleteButton=async()=>{
      try {
         await axios.delete(`http://192.168.1.35:8004/api/v1/projects/${project._id}`)
         await loadMyProjects()
         await loadProjects()
         console.log('proyecto borrado con exito')
      } catch (error) {
         console.log(error)
         
      }
     
   }

 

  return (
    <View style={{width:'100%',maxHeight:'auto',height:170,display:'flex',flexDirection:'column',padding:10,marginBottom:12,alignItems:'center',backgroundColor:'white'}}>
       <View style={{width:'90%',height:'auto',display:'flex',flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between'}}>
          <View style={{width:'60%',display:'flex',flexDirection:'column',height:'100%'}}>
             <Text style={{fontWeight:'medium',fontSize:16, marginTop:24,marginRight:10}}>{project.titulo}</Text>
          </View>
          <Image source={finance} style={{ borderRadius: 5, height: 100, width: '40%' }} />
       </View>
       <View style={{width:'90%',height:'30%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          <Pressable onPress={handleEditButton}>
              <Text style={{color:'#235632'}}>Editar</Text>
          </Pressable>
          <Pressable>
              <Text onPress={handleDeleteButton} style={{color:'red'}}>Eliminar</Text>
          </Pressable>
       </View>
       
    </View>
  )
}

export default EditableProject