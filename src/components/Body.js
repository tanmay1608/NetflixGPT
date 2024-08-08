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
import NotFound from "./NotFound";

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
      element: <PrivateBrowseRoute />,
      children: [
        {
          path: "/browse/:movieId",
          element: <MovieDetailsPage />,
        },
      ],
      
    },{
      path:"*",
      element:<NotFound/>
    }
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
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        

        const { uid, email, displayName } = user;

        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        storeUserInfo(user);

      
      } else {
        
       
        dispatch(removeUser());
        clearUserInfo();
        dispatch(clearMovieSlice());
        dispatch(clearConfigSlice());
       
      }
    });

    //Unsubscribe when unmounts
    return () => unsubscribe();
  }, []);

  return <RouterProvider router={appRouter}></RouterProvider>;
};

export default Body;
