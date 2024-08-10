import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addSearchedMovies } from "../store/moviesSlice";
import { setLoading } from "../store/configSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { setSearchError } from "../store/errorSlice";

const SearchBar = () => {
  const langKey = useSelector((store) => store.config?.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const searchTMDBMovies = async () => {
    const controller = new AbortController();
    const timeoutID = setTimeout(() => {
      controller.abort();
    }, 1000);
    try {
      dispatch(setLoading(true));

      const data = await fetch(
        "https://api.themoviedb.org/3/search/movie?query=" +
          searchText?.current?.value +
          "&include_adult=false&page=1",
        {
          ...API_OPTIONS,
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutID);

      if (!data?.ok) throw new Error(`HTTP error! status: ${data?.status}`);

      const json = await data?.json();

      dispatch(
        addSearchedMovies({
          movieName: searchText?.current?.value,
          movieResult: json?.results,
        })
      );

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      if (error.message === "signal is aborted without reason") {
        dispatch(setSearchError("Something went wrong!!!"));
      } else {
        dispatch(setSearchError(error.message));
      }
    }
  };

  return (
    <div className="pt-[20%]  px-4 mt-5 sm:pt-[12%] md:pt-[10%] bg-black w-screen">
      <div className="flex justify-center items-center bg-black  ">
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey]?.gptSearchPlaceholder}
          className=" h-10 m-4 w-[380px]  bg-white border-neutral-400  px-3 py-2 text-sm  placeholder:text-gray-600 "
        ></input>
        <button
          className=" py-2 px-4  text-red-600 font-bold text-2xl"
          onClick={searchTMDBMovies}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
