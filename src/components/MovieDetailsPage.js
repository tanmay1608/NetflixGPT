import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { showMovieDetails } from "../store/configSlice";
import { IMG_CDN_URL } from "../utils/constants";
import Spinner from "./Spinner";
import NotFound from "./NotFound";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const firebaseMovies = useSelector((store) => store.movies);
  const movieTrailers = useSelector((store) => store.firebase?.movieTrailer);

  const dispatch = useDispatch();

  const findMovieById = () => {
    const allmovies = [
      firebaseMovies?.nowPlayingMovies,
      firebaseMovies?.topRatedMovies,
      firebaseMovies?.popularMovies,
      firebaseMovies?.upcomingMovies,
    ]?.flatMap((movies) => movies);

    const movieResult = allmovies?.find((movie) => movie?.id == movieId);

    setMovie(movieResult ?? null);
    if (movieResult === undefined) setFetchError("Error");
  };

  const findTrailerById = () => {
    const trailerObject = movieTrailers?.find(
      (trailer) => trailer?.id == movieId
    );

    const trailerKey = { key: trailerObject?.trailer };

    setVideo(trailerKey ?? null);
  };

  const fetchMovies = async () => {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => {
      controller.abort();
    }, 1000);
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutID);

      if (!data?.ok) throw new Error(`HTTP error! status: ${data?.status}`);
      const json = await data?.json();

      setMovie(json);
    } catch (error) {
      if (error.message === "signal is aborted without reason") {
        findMovieById();
      } else {
        setFetchError(error);
      }
    }
  };

  const fetchMovieVideo = async () => {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => {
      controller.abort();
    }, 1000);
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieId + "/videos?",
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutID);
      if (!data?.ok) throw new Error(`HTTP error! status: ${data?.status}`);
      const json = await data?.json();

      setVideo(json?.results?.[0]);
    } catch (error) {
      if (error.message === "signal is aborted without reason") {
        findTrailerById();
      } else {
        setFetchError(error);
      }
    }
  };

  useEffect(() => {
    dispatch(showMovieDetails(true));
    fetchMovies();
    fetchMovieVideo();

    return () => {
      dispatch(showMovieDetails(false));
    };
  }, []);

  if (fetchError !== null) return <NotFound />;
  if (movie === null)
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-black">
        <Spinner />
      </div>
    );

  return (
    <div className=" h-screen flex ">
      <Header />
      {/*Mobile background  */}
      <div className="sm:hidden w-full  bg-black relative">
        <img
          className="w-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          src={IMG_CDN_URL + movie?.poster_path}
          alt="movie poster make it dynamic"
        />

        <div className="absolute bottom-0   w-full flex justify-center  sm:p-20 md:p-16 ">
          <div className="flex  flex-wrap p-4">
            {movie?.genres?.map((genre) => (
              <p
                key={genre?.id}
                className="rounded-full m-2  px-4 py-2  bg-gray-800 bg-opacity-50  text-white"
              >
                {genre?.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden sm:block  md:py-0  bg-black scrollbar-hide w-full">
        <div className="absolute   bg-gradient-to-r from-black w-screen h-full z-10 ">
          <div className="absolute top-1/2 transform  -translate-y-1/2   w-full flex justify-center  sm:p-20 md:p-16 ">
            <div>
              <h1 className="text-5xl font-bold text-white ">{movie?.title}</h1>
              <p className="text-base py-6 text-white  ">{movie?.overview}</p>
              <div className="flex  ">
                {movie?.genres?.map((genre) => (
                  <p
                    key={genre?.id}
                    className="rounded-full mr-2  px-4 py-2 bg-gray-800 bg-opacity-50  text-white"
                  >
                    {genre?.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen h-full ">
          <iframe
            className="w-screen  h-full "
            src={
              "https://www.youtube.com/embed/" +
              video?.key +
              "?&autoplay=1&mute=1&loop=1&playlist=" +
              video?.key
            }
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
