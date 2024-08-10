import Header from "./Header";
import { useNowplayingMovies } from "../hooks/useNowplayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import SearchPage from "./SearchPage";
import { useSelector } from "react-redux";
import Dropdown from "./Dropdown";
import Footer from "./Footer";
import { useHandleAPIErrors } from "../hooks/useHandleAPIErrors";
import Shimmer from "./Shimmer";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect } from "react";
import Error from "./Error";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../store/moviesSlice";
import { addPopularMovies } from "../store/moviesSlice";
import { addTopRatedMovies } from "../store/moviesSlice";
import { addUpcomingMovies } from "../store/moviesSlice";
import { addMovieTrailer } from "../store/firebaseSlice";
import { setFetchError } from "../store/errorSlice";

const Browse = () => {
  const showGPTSearch = useSelector((store) => store.gpt?.showGPTSearch);
  const isDropdownVisible = useSelector((store) => store.config?.showDropdown);
  const errorhandling = useSelector((store) => store.error?.fetchError);
  const dispatch = useDispatch();

  const nowPlayingError = useNowplayingMovies();
  const popularMoviesError = usePopularMovies();
  const topRatedMoviesError = useTopRatedMovies();
  const upcomingMoviesError = useUpcomingMovies();

  useHandleAPIErrors(
    nowPlayingError,
    popularMoviesError,
    topRatedMoviesError,
    upcomingMoviesError
  );

  const firebaseDatabase = () => {
    try {
      const db = getDatabase();
      const starCountRef = ref(db);

      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();

        dispatch(addNowPlayingMovies(data?.movies?.nowPlayingMovies));
        dispatch(addPopularMovies(data?.movies?.popularMovies));
        dispatch(addTopRatedMovies(data?.movies?.topRatedMovies));
        dispatch(addUpcomingMovies(data?.movies?.upcomingMovies));
        dispatch(addMovieTrailer(data?.trailers));
      });
    } catch (e) {
      dispatch(setFetchError("ERROR"));
    }
  };

  useEffect(() => {
    if (errorhandling === "ERR_CONNECTION_TIMEOUT") firebaseDatabase();
  }, [errorhandling]);

  if (errorhandling === null) return <Shimmer />;

  if (errorhandling === "ERROR") return <Error />;

  return (
    <div className="relative  h-screen bg-black overflow-x-scroll scrollbar-none scrollbar-hide">
      <Header />
      {isDropdownVisible && <Dropdown />}

      {showGPTSearch ? (
        <SearchPage />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      {/*Mobile View */}
      <Footer />
    </div>
  );
};

export default Browse;
