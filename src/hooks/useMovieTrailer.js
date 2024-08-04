
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { addTrailerVideo } from "../store/moviesSlice";

const useMovieTrailer=(movieId)=>{
    const dispatch=useDispatch();
    const getMovieVideos = async () => {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      const json = await data.json();
       console.log(json);
       const filterData = json.results.filter((video) => video.type === "Trailer");
       const trailer = filterData.length ? filterData[0] : json.results[0];
       dispatch(addTrailerVideo(trailer?.key));
      
    };
    useEffect(() => {
      getMovieVideos().catch((e)=>{
        console.log(e);
      })
    }, []);
}

export default useMovieTrailer;