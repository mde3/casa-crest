// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "casa-crest.firebaseapp.com",
  projectId: "casa-crest",
  storageBucket: "casa-crest.appspot.com",
  messagingSenderId: "495882493538",
  appId: "1:495882493538:web:e89335014797024f393b3b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);