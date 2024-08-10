import React from "react";
import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";
import Spinner from "./Spinner";
const MovieSuggestions = () => {
  const movies = useSelector((store) => store.movies?.searchedMovies);
  const loading = useSelector((store) => store.config?.loading);
  const tmdbSearchError = useSelector((store) => store.error?.searchError);

  if (loading) return <Spinner />;
  if (tmdbSearchError !== null)
    return (
      <div className=" w-full flex justify-center p-4">
        <h1 className="text-white sm:text-xl">
          {tmdbSearchError + ": Try again later. "}
        </h1>
      </div>
    );
  if (movies?.movieResult === null) return null;

  if (movies?.movieResult?.length === 0)
    return (
      <div className=" w-full flex justify-center p-4">
        <h1 className="text-white sm:text-xl">No Result found......</h1>;
      </div>
    );

  return (
    <div className=" pl-12 ">
      <MoviesList
        title={movies?.movieName}
        movies={movies?.movieResult}
      ></MoviesList>
    </div>
  );
};

export default MovieSuggestions;
