import {useEffect} from 'react'
import MovieCard from './MovieCard'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { showMovieDetails } from '../store/configSlice';

const MoviesList = ({movies,title}) => {

    // if(movies.length) return null;

  const dispatch=useDispatch();
    const handleMovieDetails=()=>{
      dispatch(showMovieDetails(true));
    }

   


  return (
    <div className='py-2'>

            <h1 className='text-2xl  py-4 text-white'>{title}</h1>
      
        <div className='flex overflow-x-scroll scrollbar-none scrollbar-hide'>
            <div className='flex'>
            {movies?.map((movie)=>
                <Link key={movie?.id} to={"/browse/"+movie.id } onClick={handleMovieDetails}><MovieCard  poster_path={movie?.poster_path}/></Link>
            )}
            </div>
           
        </div>
    </div>
  )
}

export default MoviesList
