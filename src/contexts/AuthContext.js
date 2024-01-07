import React, { useEffect, useState, createContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { app, auth, db, database } from "../firebaseConfig";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => null);
  const [loading, setLoading] = useState(() => true);
  // const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); 
      // Loading = False means we have an authenticated user, so we can just load the page
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, loading }}>
      {!loading && children} 
      {/* using Loading here */}
    </AuthContext.Provider>
  );
};
