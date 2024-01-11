import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app, auth, db, database } from "../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { AuthContext } from "../../../contexts/AuthContext";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/LandingPage.css";

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

  const startMultiPlayerGame = () => {
    navigate("/game/lobby"); // Adjust the path as per your routing setup
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Tic-Tac-Toe!</h1>
        <p>Challenge your friends or play against AI in this classic game.</p>
      </header>

      <main className="landing-main">
        <section className="game-description">
          <h2>How to Play:</h2>
            <p>Sign in with your Google account.</p>
            <p>Choose to start a new game or join an existing one.</p>
            <p>Take turns to place your mark (X or O) in the grid.</p>
            <p>The first player to align three marks wins!</p>
        </section>

        <section className="landing-actions">
          {!currentUser && (
            <button className="sign-in-button" onClick={handleSignIn}>
              Sign in with Google
            </button>
          )}

          {currentUser && (
            <div className="welcome-back-message">
              <p>
                Welcome back, {currentUser.displayName || currentUser.email}!
              </p>
              <button
                className="profile-button"
                onClick={() => navigate("/profile")}
              >
                Go to Your Profile
              </button>
              <button className="play-button" onClick={startSinglePlayerGame}>
                Play
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
