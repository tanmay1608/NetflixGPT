import React from 'react'
import VideoBackground from './VideoBackground'
import VideoTitle from './VideoTitle'
import { useSelector } from 'react-redux'

const MainContainer = () => {
    const movies=useSelector((store)=> store.movies?.nowPlayingMovies);
    if(!movies) return;
    const mainMovie=movies[0];
    console.log(mainMovie);
    const {title,
        overview,id,poster_path}=mainMovie;
  return (
  
    <div className='py-20  mt-24 sm:py-0   md:py-0 lg:-mt-24 bg-black scrollbar-hide w-full'>
     
      <VideoTitle title={title} overview={overview} id={id}/>
      <VideoBackground movieId={id} poster_path={poster_path}/>
    </div>
  )
}

export default MainContainer
