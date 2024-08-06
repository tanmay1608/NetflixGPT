import { useEffect, useState } from "react";
import MainContainer from "./MainContainer";
import { useParams } from "react-router-dom";
import { API_OPTIONS } from "../utils/constants";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { showMovieDetails } from "../store/configSlice";
import { IMG_CDN_URL } from "../utils/constants";
import Spinner from "./Spinner";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);

  const dispatch = useDispatch();
  dispatch(showMovieDetails(true));

  const fetchMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US",
        API_OPTIONS
      );
      const json = await data.json();
      console.log("Movies YESSS", json);
      setMovie(json);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovieVideo = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" + movieId + "/videos?",
        API_OPTIONS
      );
      const json = await data.json();
      console.log(json);

      const filterData = json.results.filter(
        (video) =>
          video.type === "Trailer" ||
          video.type === "Official Trailer" ||
          video.type === "Teaser" ||
          video.type === "Featurette" ||
          video.type.toLowerCase().includes("trailer")
      );

      console.log(filterData);

      setVideo(json.results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchMovieVideo();

    return () => {
      dispatch(showMovieDetails(false));
    };
  }, []);

  if(movie==null) return (<div className="flex justify-center items-center h-screen w-screen bg-black">
    <Spinner/>
  </div>)

  return (
    <div className=" h-screen flex ">
      <Header />
      {/*Mobile backgrounf  */}
      <div className="sm:hidden w-full  bg-black relative">
        <img
          className="w-80 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
          src={IMG_CDN_URL + movie?.poster_path}
          alt="movie poster make it dynamic"
        />

<div className="absolute bottom-0   w-full flex justify-center  sm:p-20 md:p-16 ">
            
              <div className="flex  flex-wrap p-4">
                {movie?.genres.map((genre) => (
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
              <h1 className="text-5xl font-bold text-white ">
                {movie?.title}
              </h1>
              <p className="text-base py-6 text-white  ">
                {movie?.overview}
              </p>
              <div className="flex  ">
                {movie?.genres.map((genre) => (
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
