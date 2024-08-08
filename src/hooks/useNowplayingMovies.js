
import {useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../store/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
export  const useNowplayingMovies=()=>{

  
  
    const dispatch=useDispatch();
    
  
    const getNowPlaying= async () => {

      try {const data=await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);

        
    
        if(!data.ok) throw new Error(`HTTP error! status: ${data.status}`)

        const json= await data.json(); 
        dispatch(addNowPlayingMovies(json.results));
        console.log(json.results);
        
      } catch (error) {
        
       
      }
        
    }
  
    
    useEffect(()=>{
      
      getNowPlaying()
    },[]);

    
}
