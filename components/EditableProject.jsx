import { View,Text,Image, Pressable } from "react-native"
import finance from '../assets/finance.jpg'

const EditableProject = ({project}) => {
  return (
    <View style={{width:'100%',height:150,display:'flex',flexDirection:'column',padding:5,alignItems:'center',backgroundColor:'white'}}>
       <View style={{width:'90%',height:'70%',display:'flex',flexDirection:'row',alignItems:'flex-start',justifyContent:'space-between'}}>
          <View style={{width:'60%',display:'flex',flexDirection:'column',height:'100%'}}>
             <Text style={{fontWeight:'bold',fontSize:18,textDecorationLine:'underline',}}>{project.titulo}</Text>
             <Text style={{fontSize:12,width:'100%'}}>{project.descripcion}</Text>
          </View>
          <Image source={finance} style={{ borderRadius: 5, height: 100, width: '40%' }} />
       </View>
       <View style={{width:'90%',height:'30%',display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
          <Pressable>
              <Text style={{color:'#235632'}}>Editar</Text>
          </Pressable>
          <Pressable>
              <Text style={{color:'red'}}>Eliminar</Text>
          </Pressable>
       </View>
       
    </View>
  )
}

export default EditableProject