import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app, auth, db, database } from "../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../contexts/AuthContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // User signed in
        const user = result.user;
        createUserRecord(user).then(() => {
          console.log("User signed in:", user);
          navigate("/profile"); // Redirect after successful sign-in
        });
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  const createUserRecord = async (user) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        email: user.email,
        name: user.displayName || "",
        // ... other user properties you want to save
        wins: user.wins || 0,
        loses: user.losses || 0,
        draws: user.draws || 0,
      });
    }
  };

  const startSinglePlayerGame = () => {
    navigate("/game/singleplayer"); // Adjust the path as per your routing setup
  };

  // const startMultiPlayerGame = () => {
  //   navigate("/game/multiplayer"); // Adjust the path as per your routing setup
  // };

  return (
    <div className="landing-page">
      <h1>Welcome to Tic-Tac-Toe!</h1>
      <p>Challenge your friends or play against AI in this classic game.</p>

      <section className="game-description">
        <h2>How to Play:</h2>
        <ul>
          <li>Sign in with your Google account.</li>
          <li>Choose to start a new game or join an existing one.</li>
          <li>Take turns to place your mark (X or O) in the grid.</li>
          <li>The first player to align three marks wins!</li>
        </ul>
      </section>

      {!currentUser && (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}

      {currentUser && (
        <div className="welcome-back-message">
          <p>Welcome back, {currentUser.displayName || currentUser.email}!</p>
          <button onClick={() => navigate("/profile")}>
            Go to Your Profile
          </button>
          <button onClick={startSinglePlayerGame}>Play</button>
          {/* <button onClick={startMultiPlayerGame}>Play Multiplayer</button> */}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
