
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { addTrailerVideo } from "../store/moviesSlice";

const useMovieTrailer=(movieId)=>{
    const dispatch=useDispatch();
    const getMovieVideos = async () => {
      
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        
        if(!data.ok) throw new Error(`HTTP error! status: ${data.status}`)
        
  
        const json = await data?.json();
         console.log(json);
         const filterData = json?.results?.filter((video) => video?.type === "Trailer");
         const trailer = filterData?.length ? filterData?.[0] : json?.results?.[0];
         dispatch(addTrailerVideo(trailer?.key));
      } catch (error) {
        
      }
      
      
    };
    useEffect(() => {
      getMovieVideos();
    }, []);
}

export default useMovieTrailer;