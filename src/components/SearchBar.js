import { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";

import { API_OPTIONS } from "../utils/constants";
import { addSearchedMovies } from "../store/moviesSlice";
import { setLoading, toggleSearchClicked } from "../store/configSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {
  const langKey = useSelector((store) => store.config?.lang);
  const dispatch=useDispatch();
  const searchText = useRef(null);
  console.log(lang[langKey]);

  const searchTMDBMovies = async () => {
    dispatch(setLoading(true));
    console.log(searchText.current.value);
    
    const data= await fetch("https://api.themoviedb.org/3/search/movie?query="+searchText.current.value+"&include_adult=false&page=1", API_OPTIONS)
    const json=await data.json();

    dispatch(addSearchedMovies({movieName:searchText.current.value,movieResult:json.results}));
    dispatch(setLoading(false));

   
  };
  return (
    <div className="pt-[20%]  px-4 mt-5 sm:pt-[12%] md:pt-[10%] bg-black w-screen">
      <div className="flex justify-center items-center bg-black  ">
        <input
          ref={searchText}
          type="text"
          placeholder={lang[langKey].gptSearchPlaceholder}
          className=" h-10 m-4 w-[380px]  bg-white border-neutral-400  px-3 py-2 text-sm  placeholder:text-gray-600 "
        ></input>
        <button
          className=" py-2 px-4  text-red-600 font-bold text-2xl"
          onClick={searchTMDBMovies}
        >
          {/* {lang[langKey].search} */}
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
