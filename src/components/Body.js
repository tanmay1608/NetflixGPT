import { createBrowserRouter} from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import {useEffect} from "react";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth/web-extension";
import {auth} from "../utils/firebase";
import { addUser, removeUser } from "../store/userSlice";
import {useDispatch} from "react-redux";


const Body = () => {

  const dispatch=useDispatch();
 
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  useEffect(()=>{
  
    //so we only want to add this event listener only once
    //and we are using onAuthStateChanged at root level


     //so method is like event listener whenevr there is a change in authState it is called 
  // like when when user signIn, sign Out, sign Up
  onAuthStateChanged(auth, (user) => {
    
    if (user) {
      console.log("Inside onAuthStateChanged",user);
   
      const {uid,email,displayName} = user;
     dispatch(addUser({uid:uid,email:email,displayName:displayName}));

      //redirect user to browse page
      //for navigation we have navigation hook
    //  navigate("/browse");
      
    } else {
      console.log("Inisde else")
      // User is signed out
        dispatch(removeUser());
        //if user sign out navigate to main page
       // navigate("/");
    }
  });
  },[]);

 

  return <RouterProvider router={appRouter}></RouterProvider>;
};

export default Body;
