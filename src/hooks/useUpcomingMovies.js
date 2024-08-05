import {useEffect} from "react";
import { useDispatch } from "react-redux";
import {addUpcomingMovies } from "../store/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
    const dispatch=useDispatch();
    
  
    const getTopRatedMovies= async () => {
        const data=await fetch('https://api.themoviedb.org/3/movie/upcoming?&page=1', API_OPTIONS)
        const json= await data.json(); 
        dispatch(addUpcomingMovies(json.results));
        
    }
  
    
    useEffect(()=>{
      
        getTopRatedMovies();
    },[]);
}

export default useUpcomingMovies
