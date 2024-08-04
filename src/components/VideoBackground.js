
import {  useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";


const VideoBackground = ({ movieId }) => {

  //  const [trailerKey,setTrailerKey]=useState(null);
  const trailerKey=useSelector((store)=>store.movies?.trailerVideo);
  useMovieTrailer(movieId);
   
  return (
    <div className="   w-screen aspect-video ">
      <iframe
        className="w-screen  aspect-video"
        src={"https://www.youtube.com/embed/"+trailerKey+"?&autoplay=1&mute=1&loop=1&playlist="+trailerKey}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      
      ></iframe>
    </div>
  );
};

export default VideoBackground;
