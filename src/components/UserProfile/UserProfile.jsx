import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const goToGamePage = () => {
        navigate('/game'); // Replace '/game' with the actual path to your game page
    };

    return (
        <div className="user-profile">
        {/* <div> */}
            <h1>User Profile</h1>
            {/* Display user information */}
            <p>Email: {currentUser?.email}</p>
            {/* More user details */}

            <button onClick={goToGamePage} className="go-to-game-button">
                Play
            </button>
        </div>
    );
};

export default UserProfile;