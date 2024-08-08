import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket, faHouse } from '@fortawesome/free-solid-svg-icons'
import {updateSearchSection} from "../store/configSlice"
import { toggleGPTSearchView } from "../store/gptSlice";
import { toggleDropdown } from "../store/configSlice";
import { removeSearchedMovies } from "../store/moviesSlice";
import { useDispatch, useSelector } from "react-redux";


const Footer = () => {

    const showGPTSearch = useSelector((store) => store.gpt?.showGPTSearch);
    const dispatch = useDispatch();
  
    const handleGPTSearchClick = () => {
        if (showGPTSearch) dispatch(removeSearchedMovies());
        dispatch(toggleGPTSearchView());
        dispatch(updateSearchSection(true));
      };

      const handleDropdownClick=()=>{
        dispatch(toggleDropdown());
      }
      const handleHomeClick=()=>{
       
        if(showGPTSearch){
            dispatch(toggleGPTSearchView());
            dispatch(removeSearchedMovies());
            dispatch(updateSearchSection(true));
        }
      }

  return (
    <div className='w-full h-14 bg-gray-700 bg-opacity-50 fixed z-40 bottom-0 md:hidden'>
      <div className='flex text-white justify-between items-center h-full'>
        <div>
        <button className={`flex justify-center items-center w-10 h-10 m-4 bg-gray-700 bg-opacity-50 hover:bg-opacity-70  font-semibold text-white  rounded-full cursor-pointer `}
            onClick={handleHomeClick} >
            {<FontAwesomeIcon icon={faHouse} />}
            </button>
        </div>
        <div>
            <button className={`flex justify-center items-center w-10 h-10 m-4 bg-gray-700 bg-opacity-50 hover:bg-opacity-70  font-semibold ${showGPTSearch ? "text-yellow-300" : "text-white"}  rounded-full cursor-pointer`}
             onClick={handleGPTSearchClick}>
            {<FontAwesomeIcon  icon={faRocket} />}
            </button>
        </div>
        <div>
        <img
            className="w-10 h-10 m-4 cursor-pointer  "
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            alt="user-logo"
            onClick={handleDropdownClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
