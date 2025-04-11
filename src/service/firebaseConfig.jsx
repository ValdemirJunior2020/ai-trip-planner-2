// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtj6omfpv7AEhDDexYEmSskMkuN5N69s8",
  authDomain: "ai-trip-planner-2f557.firebaseapp.com",
  projectId: "ai-trip-planner-2f557",
  storageBucket: "ai-trip-planner-2f557.firebasestorage.app",
  messagingSenderId: "110758122595",
  appId: "1:110758122595:web:0eef38477a5ba516205456",
  measurementId: "G-X8JTGXSPXP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore()
// const analytics = getAnalytics(app);