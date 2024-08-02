import { LOGO_URL } from "../utils/constants"
import {signOut} from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Header = () => {

  const user=useSelector((store)=> store.user);

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
    <div className="absolute px-8 py-2  bg-gradient-to-b from-black w-full  z-10 flex  justify-between items-center" >
      <img className="w-44 mx-32" src={LOGO_URL} alt="logo"></img>

      {user && <div className="">
        <img className="w-8 h-8" src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg" alt="user-logo"/>
        <span className="cursor-pointer" onClick={handleButtonClick}>(Sign Out)</span>
      </div>}
    </div>
  )
}

export default Header;
