import React from 'react'
import { IMG_CDN_URL } from '../utils/constants';

const MovieCard = ({poster_path}) => {

    if(!poster_path) return;
    
  return (
    
      <div className='w-48 pr-4'>
        <img className=' rounded-xl transition-transform transform hover:scale-95' src={IMG_CDN_URL+poster_path} alt={"Movie Poster"}/>
      </div>
    
  )
}

export default MovieCard
