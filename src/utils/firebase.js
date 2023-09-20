// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK3ocH85DcjhOORos-N7ygHx_-PvU1z6E",
  authDomain: "netflixgpt-a334b.firebaseapp.com",
  projectId: "netflixgpt-a334b",
  storageBucket: "netflixgpt-a334b.appspot.com",
  messagingSenderId: "295019008855",
  appId: "1:295019008855:web:a6bef496f88d1557db6412"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
