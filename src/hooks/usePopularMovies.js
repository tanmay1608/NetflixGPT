import {useEffect} from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../store/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
const usePopularMovies = () => {
    const dispatch=useDispatch();
    
  
    const getPopularMovies= async () => {
        try {
            const data=await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS)

           
            if(!data.ok) throw new Error(`HTTP error! status: ${data.status}`)
            const json= await data.json(); 
            dispatch(addPopularMovies(json.results));
        } catch (error) {
            
        }


       
        
    }
  
    
    useEffect(()=>{
      
        getPopularMovies();
    },[]);
}

export default usePopularMovies;
