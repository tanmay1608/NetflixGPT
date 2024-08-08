import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { toggleGPTSearchView } from "../store/gptSlice";
import { changeLanguage, toggleDropdown } from "../store/configSlice";
import { removeSearchedMovies } from "../store/moviesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { updateSearchSection } from "../store/configSlice";

const Header = () => {
  const user = localStorage.getItem("user");
  const showGPTSearch = useSelector((store) => store.gpt?.showGPTSearch);
  const langKey = useSelector((store) => store.config?.lang);
  const isDropdownVisible = useSelector((store) => store.config?.showDropdown);
  const showMovieDetails = useSelector((store) => store.config?.movieDetails);

  const dispatch = useDispatch();

  const handleGPTSearchClick = () => {
    if (showGPTSearch) dispatch(removeSearchedMovies());
    dispatch(toggleGPTSearchView());
    dispatch(updateSearchSection(true));
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleDropdownClick = () => {
    dispatch(toggleDropdown());
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 px-8 py-2  bg-gradient-to-b from-black w-full  z-40 flex flex-col   justify-between items-center
    md:flex-row
    "
    >
      <img className="w-40 " src={LOGO_URL} alt="logo"></img>

      {user && !showMovieDetails && (
        <div className="hidden md:flex  justify-end items-center ">
          {showGPTSearch && (
            <div className="bg-gray-700 px-2 rounded-full ">
              <select
                className=" m-2 bg-gray-700 text-white outline-none "
                value={langKey}
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES?.map((language) => {
                  return (
                    <option
                      key={language?.identifier}
                      value={language?.identifier}
                    >
                      {language?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          <button
            className={`flex justify-center items-center w-10 h-10 m-2 bg-gray-700 bg-opacity-50 hover:bg-opacity-70  font-semibold ${
              showGPTSearch ? "text-yellow-300" : "text-white"
            }  rounded-full cursor-pointer`}
            onClick={handleGPTSearchClick}
          >
            {<FontAwesomeIcon icon={faRocket} />}
          </button>
          <img
            className="w-10 h-10 m-2 cursor-pointer  "
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            alt="user-logo"
            onClick={handleDropdownClick}
          />
          <span
            className="cursor-pointer text-white"
            onClick={handleDropdownClick}
          >
            {isDropdownVisible ? (
              <FontAwesomeIcon icon={faCaretUp} />
            ) : (
              <FontAwesomeIcon icon={faCaretDown} />
            )}
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;
