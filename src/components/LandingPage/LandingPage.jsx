import React from 'react';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app, auth, db, database } from '../../firebaseConfig'; 

function LandingPage() {
    const handleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                console.log('User signed in:', result.user);
                // Redirect to game or user dashboard
            })
            .catch((error) => {
                // Handle Errors here.
                console.error('Error during sign-in:', error);
            });
    };

    return (
        <div className="landing-page">
            <h1>Welcome to Tic-Tac-Toe!</h1>
            <p>Get ready to challenge your friends in a classic game of Tic-Tac-Toe.</p>
            <button onClick={handleSignIn}>Sign in with Google</button>
            <div className="game-instructions">
                <h2>How to Play:</h2>
                <ul>
                    <li>Sign in with your Google account.</li>
                    <li>Choose to start a new game or join an existing one.</li>
                    <li>Take turns to place your mark (X or O) in the grid.</li>
                    <li>The first player to align three marks wins!</li>
                </ul>
            </div>
        </div>
    );
}

export default LandingPage;
