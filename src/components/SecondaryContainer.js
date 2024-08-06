import React from "react";
import MoviesList from "./MoviesList";
import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";



const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const langKey = useSelector((store) => store.config?.lang);
  console.log("movies ",movies)
 

    
  return (

     movies?.upcomingMovies &&   (<div className="bg-black">
      <div className="-mt-12  md:-mt-30  lg:-mt-60 pl-12 relative z-20">
        <MoviesList title={lang[langKey].nowPlaying} movies={movies?.nowPlayingMovies}></MoviesList>
        <MoviesList title={lang[langKey].topRated} movies={movies?.topRatedMovies}></MoviesList>
        <MoviesList title={lang[langKey].popular} movies={movies?.popularMovies}></MoviesList>
        <MoviesList title={lang[langKey].upcoming} movies={movies?.upcomingMovies}></MoviesList>
      </div>
    </div>)
    
  );
};

export default SecondaryContainer;
