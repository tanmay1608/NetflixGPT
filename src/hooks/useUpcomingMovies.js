import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUpcomingMovies } from "../store/moviesSlice";
import { API_OPTIONS } from "../utils/constants";

const useUpcomingMovies = () => {
  const movies = useSelector((store) => store.movies?.upcomingMovies);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const getTopRatedMovies = async () => {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => {
      controller.abort();
    }, 1000);
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?&page=1",
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutID);

      if (!data?.ok) throw new Error(`HTTP error! status: ${data?.status}`);
      const json = await data?.json();
      dispatch(addUpcomingMovies(json?.results));
      setError("SUCCESS");
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (!movies) {
      getTopRatedMovies();
    } else {
      setError("SUCCESS");
    }
  }, []);

  return error;
};

export default useUpcomingMovies;
