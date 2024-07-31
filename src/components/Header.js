import { LOGO_URL } from "../utils/constants"


const Header = () => {
  return (
    <div className="absolute px-8 py-2  bg-gradient-to-b from-black w-full  z-10" >
      <img className="w-44 mx-32" src={LOGO_URL} alt="logo"></img>
    </div>
  )
}

export default Header
