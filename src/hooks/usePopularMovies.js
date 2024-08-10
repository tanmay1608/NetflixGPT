import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../store/moviesSlice";
import { API_OPTIONS } from "../utils/constants";
const usePopularMovies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies?.popularMovies);

  const [error, setError] = useState(null);

  const getPopularMovies = async () => {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => {
      controller.abort();
    }, 1000);

    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutID);

      if (!data?.ok) throw new Error(`HTTP error! status: ${data?.status}`);
      const json = await data?.json();
      dispatch(addPopularMovies(json?.results));
      setError("SUCCESS");
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (!movies) {
      getPopularMovies();
    } else {
      setError("SUCCESS");
    }
  }, []);

  return error;
};

export default usePopularMovies;
