// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

// Firebase configuration
export const firebaseConfig = {
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Set persistence for Auth
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistence is now set to local, and the user will remain logged in through page refreshes and browser restarts
    console.log("Persistence set to local");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

export { auth, app };
