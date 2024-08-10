import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { IMG_CDN_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import lang from "../utils/languageConstants";
import { Link } from "react-router-dom";

const VideoBackground = ({ movieId, poster_path }) => {
  const trailerKey = useSelector((store) => store.movies?.trailerVideo);
  const langKey = useSelector((store) => store.config?.lang);
  useMovieTrailer(movieId);

  return (
    <>
      <div className=" w-screen aspect-video hidden sm:block ">
        <iframe
          className="w-screen  aspect-video "
          src={
            "https://www.youtube.com/embed/" +
            trailerKey +
            "?&autoplay=1&mute=1&loop=1&playlist=" +
            trailerKey
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      {/* MOBILE BACKGROUND */}
      <div className="sm:hidden  bg-black relative">
        <img
          className=" w-[90%] border-[1px] border-brand-beige mx-auto rounded-xl"
          src={IMG_CDN_URL + poster_path}
          alt="movie poster make it dynamic"
        />

        <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 flex ">
          <Link to={"/browse/" + movieId}>
            <button className="bg-white text-black font-bold py-2 px-4  mr-2 rounded-md mb-2 hover:bg-opacity-80 flex justify-center items-center">
              {<FontAwesomeIcon className="pr-2 text-xl " icon={faPlay} />}{" "}
              {lang[langKey]?.play}
            </button>
          </Link>

          <Link to={"/browse/" + movieId}>
            <button className="bg-gray-400 text-white font-bold py-2 px-4 ml-2 rounded-md mb-2 bg-opacity-80 hover:bg-opacity-50 flex justify-center items-center ">
              {<FontAwesomeIcon className="pr-2 text-xl" icon={faCircleInfo} />}
              {lang[langKey]?.moreInfo}
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default VideoBackground;
