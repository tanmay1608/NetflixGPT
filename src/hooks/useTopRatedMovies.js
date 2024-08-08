
import {useEffect} from "react";
import { useDispatch } from "react-redux";
import {addTopRatedMovies } from "../store/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
const useTopRatedMovies = () => {
    const dispatch=useDispatch();
    
  
    const getTopRatedMovies= async () => {

        try {
            const data=await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS)

            if(!data.ok) throw new Error(`HTTP error! status: ${data.status}`)
            const json= await data.json(); 
            dispatch(addTopRatedMovies(json.results));
        } catch (error) {
            
        }

      
        
    }
  
    
    useEffect(()=>{
      
        getTopRatedMovies();
    },[]);
}

export default useTopRatedMovies
