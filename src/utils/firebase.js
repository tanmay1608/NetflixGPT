// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuIhdsvhyk2s6J3tk8JJFyLySsJ2nzKtc",
  authDomain: "netflixgpt-31aef.firebaseapp.com",
  projectId: "netflixgpt-31aef",
  storageBucket: "netflixgpt-31aef.appspot.com",
  messagingSenderId: "196009581455",
  appId: "1:196009581455:web:8304026ee001cc8d74c9fa",
  measurementId: "G-5GMJD7528Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth();//putitng this auth at central place