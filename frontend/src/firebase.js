// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnfPNwBgnqFoy3Z3UNdL5zN-HLnEOovEg",
  authDomain: "varta-20.firebaseapp.com",
  projectId: "varta-20",
  storageBucket: "varta-20.appspot.com",
  messagingSenderId: "6385630462",
  appId: "1:6385630462:web:968f21d073ef55ee03b9af"
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {auth, provider};
