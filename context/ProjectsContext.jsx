/* eslint-disable react/prop-types */
import  { createContext, useState } from "react";
import axios from "axios";
const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [homeProjects,setHomeProjects]=useState()
  const [isSorting,setIsSorting]=useState(false)
  const [myProjects,setMyProjects]=useState()

 

  const loadProjects = async()=>{
    try {
       const response = await axios.get(`http://192.168.1.35:8004/api/v1/projects`)
       setHomeProjects(response.data.projects)
       
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
      setHomeProjects(response.data.projects)
      setIsSorting(true)
      
   } catch (error) {
      console.log(error)
      
   }
  }

  const loadMyProjects = async()=>{
    try {
       const response = await axios.get(`http://192.168.1.35:8004/api/v1/projects/MyProjects`,)
       setMyProjects(response.data.projects)
       
    } catch (error) {
       console.log(error)
       
    }
      
   }
  

  
  return (
    <ProjectsContext.Provider value={{
      homeProjects,
      setHomeProjects,
      loadProjects,
      loadMasGustados,
      isSorting,
      setIsSorting,
      myProjects,
      setMyProjects,
      loadMyProjects,
      
      
        }}>
      {children}
    </ProjectsContext.Provider>
  );
    }

export default ProjectsProvider;

export { ProjectsContext };
