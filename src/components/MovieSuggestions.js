import React from 'react'
import {useSelector} from "react-redux";
import MoviesList from './MoviesList';
import Spinner from './Spinner';
const MovieSuggestions = () => {
    const movies=useSelector((store)=> store.movies?.searchedMovies);
    const loading=useSelector((store)=>store.config?.loading)

    if(loading) return <Spinner/>
    if(movies === null || movies?.movieResult === null) return null;

    
    if(movies?.movieResult.length ===0) return <h1 className='text-white'>No Result found......</h1>
    
    
 return (
    <div className=' pl-12 '>
       <MoviesList title={movies?.movieName} movies={movies?.movieResult}></MoviesList>
    </div>
  )
}

export default MovieSuggestions
