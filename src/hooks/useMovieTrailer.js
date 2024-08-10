import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../store/moviesSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailers = useSelector((store) => store.firebase?.movieTrailer);

  const addfirebaseDataToReduxStore = () => {
    const trailerObject = trailers?.find((trailer) => trailer?.id === movieId);
    dispatch(addTrailerVideo(trailerObject?.trailer));
  };

  const getMovieVideos = async () => {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => {
      controller.abort();
    }, 1000);
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutID);

      if (!data?.ok) throw new Error(`HTTP error! status: ${data?.status}`);

      const json = await data?.json();

      const filterData = json?.results?.filter(
        (video) => video?.type === "Trailer"
      );
      const trailer = filterData?.length ? filterData?.[0] : json?.results?.[0];
      dispatch(addTrailerVideo(trailer?.key));
    } catch (error) {
      addfirebaseDataToReduxStore();
    }
  };
  useEffect(() => {
    getMovieVideos();
  }, []);
};

export default useMovieTrailer;
