import { createBrowserRouter } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth/web-extension";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import PrivateBrowseRoute from "./PrivateBrowseRoute";
import PrivateLoginRoute from "./PrivateLoginRoute";
import { clearMovieSlice } from "../store/moviesSlice";
import { clearConfigSlice } from "../store/configSlice";
import MovieDetailsPage from "./MovieDetailsPage";

const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <PrivateLoginRoute />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
      ],
    },
    {
      path: "/browse",
      element: <PrivateBrowseRoute />,
      children: [
        {
          path: "/browse",
          element: <Browse />,
        },
      ],
    },
    {
      path: "/browse/:movieId",
      element: <PrivateBrowseRoute/>,
      children:[
        {
          path: "/browse/:movieId",
      element: <MovieDetailsPage/>
        }
      ]
    },
  ]);

  const storeUserInfo = ({ uid, email }) => {
    const userInfo = {
      uid: uid,
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const clearUserInfo = () => {
    localStorage.removeItem("user");
  };

  useEffect(() => {
    //so we only want to add this event listener only once
    //and we are using onAuthStateChanged at root level

    //so method is like event listener whenevr there is a change in authState it is called
    // like when when user signIn, sign Out, sign Up
    //onAuthStateChanged returns an unsubscribe function
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Inside onAuthStateChanged", user);

        const { uid, email, displayName } = user;

        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        storeUserInfo(user);

        //redirect user to browse page
        //for navigation we have navigation hook
        //  navigate("/browse");
      } else {
        console.log("Inisde else");

        // storeUserInfo(null);
        // User is signed out
        dispatch(removeUser());
        clearUserInfo();
        dispatch(clearMovieSlice());
        dispatch(clearConfigSlice());
        //if user sign out navigate to main page
        // navigate("/");
      }
    });

    //Unsubscribe when unmounts
    return ()=> unsubscribe();

  }, []);

  return <RouterProvider router={appRouter}></RouterProvider>;
};

export default Body;
