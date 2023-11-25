import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // const goToGamePage = () => {
    //     navigate('/game'); // Replace '/game' with the actual path to your game page
    // };

    const startSinglePlayerGame = () => {
        navigate('/game/singleplayer'); // Adjust the path as per your routing setup
    };

    const startMultiPlayerGame = () => {
        navigate('/game/multiplayer'); // Adjust the path as per your routing setup
    };

    return (
        <div className="user-profile">
        {/* <div> */}
            <h1>User Profile</h1>
            {/* Display user information */}
            <p>Email: {currentUser?.email}</p>
            {/* More user details */}

            {/* <button onClick={goToGamePage} className="go-to-game-button">
                Play
            </button> */}

            <button onClick={startSinglePlayerGame} className="go-to-game-button">Play Single Player</button>
            <button onClick={startMultiPlayerGame} className="go-to-game-button">Play Multiplayer</button>
        </div>
    );
};

export default UserProfile;