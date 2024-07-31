import { BG_URL } from "../utils/constants";
import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <div className="relative flex flex-col items-center  h-screen">
      <Header />
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="logo"
        ></img>
      </div>
      <form className="bg-black w-3/12 flex flex-col  absolute top-1/2 transform -translate-y-1/2 p-6 rounded-lg text-white bg-opacity-85">
        <h1 className="font-bold text-3xl   mx-9  my-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && <input   className=" mx-9 my-3 p-3 bg-gray-300 rounded-sm bg-opacity-20 "
          type="text"
          placeholder="Full Name"/> }
        <input
          className=" mx-9 my-3 p-3 bg-gray-300 rounded-sm bg-opacity-20 "
          type="text"
          placeholder="Email or mobile number"
        />
        <input
          className=" mx-9 my-3 p-3 rounded-sm bg-gray-300 bg-opacity-20"
          type="password"
          placeholder="Password"
        />
        <button className=" p-4 mx-9 my-3 bg-red-600 font-bold rounded-sm" >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className=" mx-9 my-2 cursor-pointer" onClick={()=>{
            setIsSignIn(!isSignIn)
        }}>
          <span className="text-gray-400 cursor-pointer">{isSignIn? "New to netflix?" : "Already registered?"}</span> {isSignIn? " Sign Up Now": " Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
