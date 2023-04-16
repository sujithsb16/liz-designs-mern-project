// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-hVa54sjlZdXVZSHDV-ny84qlLc5KSOk",
  authDomain: "project-liz-designs.firebaseapp.com",
  projectId: "project-liz-designs",
  storageBucket: "project-liz-designs.appspot.com",
  messagingSenderId: "698714721714",
  appId: "1:698714721714:web:0f4c3080d1f547f5e568ab",
  measurementId: "G-JS9PW1DWZK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
