import { BG_URL } from "../utils/constants";
import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { logDOM } from "@testing-library/react";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate=useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleButtonClick = () => {
    const nameValue = isSignIn ? null : name.current.value;
    const message = checkValidData(
      email.current.value,
      password.current.value,
      nameValue
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      //Sign up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          console.log("Inside createUserWithEmailAndPassword")
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
         
          
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + ": " + errorMessage);
        });
    } else {
      //sign In

      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Inside signInWithEmailAndPassword")
    navigate("browse");
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+": "+errorMessage);
  });
    }
  };

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
      <form
        onSubmit={(e) => {
          //so, when we have a button inside form it calls
          // onsubmit of form
          // and if we dont do inside onSubmit it refereshes the page to avoid that we use
          // e.preventDefault();
          e.preventDefault();
        }}
        className="bg-black w-3/12 flex flex-col  absolute top-1/2 transform -translate-y-1/2 p-6 rounded-lg text-white bg-opacity-85"
      >
        <h1 className="font-bold text-3xl   mx-9  my-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            className={`mx-9 my-3 p-3 bg-gray-300 rounded-sm bg-opacity-20`}
            ref={name}
            type="text"
            placeholder="Full Name"
          />
        )}
        <input
          ref={email}
          className={`mx-9 my-3 p-3 bg-gray-300 rounded-sm bg-opacity-20 `}
          type="text"
          placeholder="Email or mobile number"
        />
        <input
          ref={password}
          className={`mx-9 my-3 p-3 rounded-sm bg-gray-300 bg-opacity-20 `}
          type="password"
          placeholder="Password"
        />
        {errorMessage !== null && (
          <p className="text-red-600  mx-9 my-3 text-center">{errorMessage}</p>
        )}
        <button
          className=" p-4 mx-9 my-3 bg-red-600 font-bold rounded-sm"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p
          className=" mx-9 my-2 cursor-pointer"
          onClick={() => {
            setIsSignIn(!isSignIn);
            setErrorMessage(null);
          }}
        >
          <span className="text-gray-400 cursor-pointer">
            {isSignIn ? "New to netflix?" : "Already registered?"}
          </span>{" "}
          {isSignIn ? " Sign Up Now" : " Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
