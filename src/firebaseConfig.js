// Import the necessary Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

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
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);

// Export the Firebase services for use in your app
export { db, auth, database };

