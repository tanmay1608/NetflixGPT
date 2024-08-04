import { LOGO_URL } from "../utils/constants"
import {signOut} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {

  const user = localStorage.getItem('user');

  const navigate=useNavigate();
const handleButtonClick=()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
    navigate("/");

  }).catch((error) => {
    // An error happened.
  });
}

  return (
    <div className="fixed px-8 py-2  bg-gradient-to-b from-black w-full  z-20 flex  justify-between items-center" >
      <img className="w-40 " src={LOGO_URL} alt="logo"></img>

      {user && <div className="">
        <img className="w-8 h-8" src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" alt="user-logo"/>
        <span className="cursor-pointer text-white" onClick={handleButtonClick}>(Sign Out)</span>
      </div>}
    </div>
  )
}

export default Header;
