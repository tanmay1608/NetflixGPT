import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import lang from "../utils/languageConstants";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { changeLanguage } from "../store/configSlice";

const Dropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config?.lang);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 text-white fixed z-50  right-0 bottom-16 md:top-16 mr-5 mt-2 h-32 w-32 flex justify-center rounded-md shadow-lg">
      <ul>
        <li
          className="p-2 cursor-pointer border-b-2 border-white text-center"
          onClick={handleSignOut}
        >
          {lang[langKey]?.signOut}
        </li>
        <li className="p-2 cursor-pointer border-b-2 border-white text-center">
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
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
