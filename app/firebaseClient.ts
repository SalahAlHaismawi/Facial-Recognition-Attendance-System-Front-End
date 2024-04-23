// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl-9O-EaDS11r8lGwJDRekoCYLYxiptoY",
  authDomain: "face-recognition-attenda-9c856.firebaseapp.com",
  databaseURL: "https://face-recognition-attenda-9c856-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "face-recognition-attenda-9c856",
  storageBucket: "face-recognition-attenda-9c856.appspot.com",
  messagingSenderId: "667834962537",
  appId: "1:667834962537:web:eeef7cb195217e586808f8",
  measurementId: "G-MX0H3VL1LL"
};

// Initialize Firebase
const app = !firebase.apps.length ? initializeApp(firebaseConfig) : firebase.app();
const auth = getAuth(app);

export { auth };