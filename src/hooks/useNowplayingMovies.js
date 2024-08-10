import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../store/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
export const useNowplayingMovies = () => {
  const [error, setError] = useState(null);

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  const dispatch = useDispatch();

  const getNowPlaying = async () => {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => {
      controller.abort();
    }, 1000);
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1",
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutID);

      if (!data?.ok) throw new Error(`HTTP error! status: ${data?.status}`);

      const json = await data?.json();
      dispatch(addNowPlayingMovies(json?.results));

      setError("SUCCESS");
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (!movies) {
      getNowPlaying();
    } else {
      setError("SUCCESS");
    }
  }, []);

  return error;
};
