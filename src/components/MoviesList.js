import React from 'react'
import MovieCard from './MovieCard'

const MoviesList = ({movies,title}) => {

    console.log("Inside MoviesList", movies);
  return (
    <div className='py-2'>

            <h1 className='text-2xl  py-4 text-white'>{title}</h1>
      
        <div className='flex overflow-x-scroll scrollbar-none scrollbar-hide'>
            <div className='flex'>
            {movies?.map((movie)=>
                <MovieCard key={movie?.id} poster_path={movie?.poster_path}/>
            )}
            </div>
           
        </div>
    </div>
  )
}

export default MoviesList
