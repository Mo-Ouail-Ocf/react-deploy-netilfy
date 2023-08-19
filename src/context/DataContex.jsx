import { createContext , useState, useEffect } from "react";
import useWindowSize from '../hooks/useWindowSize'
import api from '../api/posts'
const DataContext = createContext({})

  export const DataProvider = ({children})=>{
    const [posts,setPosts]=useState([])
    const [search,setSearch]=useState('')  
    const [searchResults,setSearchResults]=useState([])
    const {width}=useWindowSize()
    useEffect(()=>{
      const fetchPosts = async()=>{
        try {
          const response = await api.get('/posts') //posts : end point
          //axios creates automaticly json
          // we dont have to do :if (!response.ok)
          //axios catches error out of 200 range
          setPosts(response.data)
        } catch(err) {
          //not in 200 response range
          if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
          }
          else{
            //we didnt get a response 404 ...
            console.log(` Error : ${err.message}`);
          }
        } 
      }
      fetchPosts()
    },[])

      //  search  //
      useEffect(()=>{
    
        const filteredResuls = posts.filter(post=>(
          ((post.body).toLowerCase()).includes(search.toLowerCase())
          || ((post.title).toLowerCase()).includes(search.toLowerCase())
          ))
    
          setSearchResults(filteredResuls)
      },[search,posts])
    
     
      //////////////////
    
      ////////////////////////////////////////////////
     
    
    return (
        <DataContext.Provider value={{
            //diff values , the props which will be passed
            // props will be provided through useContext
           width ,search,setSearch,posts,setPosts,
          
           searchResults,setSearchResults
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext