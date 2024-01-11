import React, { useEffect, useContext } from "react";
import { ref, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { database } from "../../../firebaseConfig";
import { AuthContext } from "../../../contexts/AuthContext";

const UserGameListener = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const userRef = ref(database, `users/${currentUser.uid}`);
        const unsubscribe = onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData.pendingMatch) {
                navigate(`/game/${userData.pendingMatch}`);
            }
        });

        return () => unsubscribe();
    }, [currentUser, navigate]);

    return null; // This component does not render anything
};

export default UserGameListener;
