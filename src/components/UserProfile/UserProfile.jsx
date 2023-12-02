import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { app, auth, db, database } from "../../firebaseConfig";
import { doc, getDoc } from 'firebase/firestore';
import './UserProfile.css';

const UserProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (currentUser) {
            const userRef = doc(db, 'users', currentUser.uid);
            getDoc(userRef).then(docSnap => {
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    // Handle the case where user data does not exist in Firestore
                    console.log('No user data found in Firestore');
                }
            }).catch(error => {
                console.error('Error fetching user data:', error);
            });
        }
    }, [currentUser]);

    const startSinglePlayerGame = () => {
        navigate('/game/singleplayer'); // Adjust the path as per your routing setup
    };

    // const startMultiPlayerGame = () => {
    //     navigate('/game/multiplayer'); // Adjust the path as per your routing setup
    // };

    return (
        <div className="user-profile">
            <h1>{userData?.displayName || 'User'}'s Profile</h1>
            <div className="stats">
                <p>Email: {currentUser?.email}</p>
                <p>Wins: {userData?.wins || 0}</p>
                <p>Losses: {userData?.losses || 0}</p>
                <p>Draws: {userData?.draws || 0}</p>
            </div>
            <button onClick={startSinglePlayerGame} className="go-to-game-button">Play</button>
            {/* <button onClick={startMultiPlayerGame} className="go-to-game-button">Play Multiplayer</button> */}
        </div>
    );
};

export default UserProfile;