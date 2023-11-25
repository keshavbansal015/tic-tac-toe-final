// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import firebase from 'firebase/app';
// import 'firebase/auth';  // If using Firebase Auth
// import 'firebase/firestore';  // If using Firestore

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // If using Firebase Auth
import { getFirestore } from 'firebase/firestore'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtf9RZxK1gMurls8knSAPrkeZrIigDs1Y",
  authDomain: "ttt-final.firebaseapp.com",
  databaseURL: "https://ttt-final-default-rtdb.firebaseio.com",
  projectId: "ttt-final",
  storageBucket: "ttt-final.appspot.com",
  messagingSenderId: "397173519793",
  appId: "1:397173519793:web:bc2800a52c4b204df5b990"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // If using Auth
const db = getFirestore(app); // If using Firestore
// ... initialize other Firebase services similarly

// Export the Firebase services for use in your app
export { app, auth, db };

