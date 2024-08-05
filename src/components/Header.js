import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants"
import {signOut} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {toggleGPTSearchView} from "../store/gptSlice"
import { changeLanguage } from "../store/configSlice";


const Header = () => {

  const user = localStorage.getItem('user');
  const dispatch=useDispatch();
  const showGPTSearch=useSelector((store)=> store.gpt?.showGPTSearch);

  const navigate=useNavigate();
const handleSignOut=()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
    navigate("/");

  }).catch((error) => {
    // An error happened.
  });
}

const handleGPTSearchClick=()=>{
  dispatch(toggleGPTSearchView());
}

const handleLanguageChange=(e)=>{
  dispatch(changeLanguage(e.target.value));
}

  return (
    <div className="fixed top-0 left-0 right-0 px-8 py-2  bg-gradient-to-b from-black w-full  z-50 flex  justify-between items-center" >
      <img className="w-40 " src={LOGO_URL} alt="logo"></img>

      {user && <div className="flex  justify-end items-center ">
        {
          showGPTSearch && ( <select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((language)=>{
              return  <option key={language.identifier} value={language.identifier}>{language.name}</option>
            })}
           </select>)
        }
       
        <butoon className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg cursor-pointer" onClick={handleGPTSearchClick}>
          {showGPTSearch ? "Homepage" : "GPTSearch"}
        </butoon>
        <img className="w-8 h-8" src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" alt="user-logo"/>
        <span className="cursor-pointer text-white" onClick={handleSignOut}>(Sign Out)</span>
      </div>}
    </div>
  )
}

export default Header;
