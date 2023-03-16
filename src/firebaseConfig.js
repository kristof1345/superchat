// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwTEZvRL9Z4fPOwTeJl2U39L_VfpRtJk0",
  authDomain: "superchat-662d5.firebaseapp.com",
  projectId: "superchat-662d5",
  storageBucket: "superchat-662d5.appspot.com",
  messagingSenderId: "265958389956",
  appId: "1:265958389956:web:38efd1245829f38cf37191",
  measurementId: "G-WF46SST8QW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
