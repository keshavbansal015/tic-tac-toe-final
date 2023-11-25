import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const UserProfile = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <h1>User Profile</h1>
            {/* Display user information */}
            <p>Email: {currentUser?.email}</p>
            {/* More user details */}
        </div>
    );
};

export default UserProfile;
