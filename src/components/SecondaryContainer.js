import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";


const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log("movies ",movies)
 

    
  return (

     movies?.upcomingMovies &&   (<div className="bg-black">
      <div className="-mt-60 pl-12 relative z-20">
        <MoviesList title={"Now Playing"} movies={movies?.nowPlayingMovies}></MoviesList>
        <MoviesList title={"Top-Rated"} movies={movies?.topRatedMovies}></MoviesList>
        <MoviesList title={"Popular"} movies={movies?.popularMovies}></MoviesList>
       
        <MoviesList title={"Upcoming"} movies={movies?.upcomingMovies}></MoviesList>
      </div>
    </div>)
    
  );
};

export default SecondaryContainer;
