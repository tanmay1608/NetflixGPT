import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFetchError } from "../store/errorSlice";

export const useHandleAPIErrors = (
  nowPlayingError,
  popularMoviesError,
  topRatedMoviesError,
  upcomingMoviesError
) => {
  const dispatch = useDispatch();

  const handleErrors = () => {
    const errors = [
      nowPlayingError,
      popularMoviesError,
      topRatedMoviesError,
      upcomingMoviesError,
    ];

    if (errors.every((error) => error === "SUCCESS")) {
      dispatch(setFetchError("SUCCESS"));
    } else if (errors.every((error) => error === null)) {
      dispatch(setFetchError(null));
    } else if (
      errors.some((error) => error === "signal is aborted without reason")
    ) {
      dispatch(setFetchError("ERR_CONNECTION_TIMEOUT"));
    } else if (errors.some((error) => error === "Failed to fetch")) {
      dispatch(setFetchError("ERR_CONNECTION_TIMEOUT"));
    } else if (errors.some((error) => error === "ERROR")) {
      dispatch(setFetchError("ERROR"));
    }
  };
  useEffect(() => {
    handleErrors();
  }, [
    nowPlayingError,
    popularMoviesError,
    topRatedMoviesError,
    upcomingMoviesError,
  ]);
};
