/* eslint-disable react/prop-types */
import  { createContext, useState } from "react";
import axios from "axios";
const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const [homeProjects,setHomeProjects]=useState()
  const [isSorting,setIsSorting]=useState(false)
  const [myProjects,setMyProjects]=useState()
  const [page,setPage]=useState(1)
  const [categoria,setCategoria] = useState("")
  const [titulo,setTitulo]=useState("")


  const limit = 15


  const loadProjects = async()=>{
    let url = `http://192.168.1.35:8004/api/v1/projects?page=${page}&limit=${limit}&sort=-likes,createdAt`;
  
    if (categoria !== "") {
      url += `&categoria=${categoria}`;
    }
    if(titulo!==""){
      url+=`&titulo=${titulo}`
    }
  
    try {
      const response = await axios.get(url);
      setHomeProjects(response.data.projects);
      console.log(response.data, categoria,titulo);
    } catch (error) {
      console.log(error, categoria);
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
      myProjects,
      setMyProjects,
      loadMyProjects,
      setPage,
      page,
      categoria,
      setCategoria,
      titulo,
      setTitulo,
      limit
        }}>
      {children}
    </ProjectsContext.Provider>
  );
    }

export default ProjectsProvider;

export { ProjectsContext }
