import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebaseConfig";
import "../CSS/UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      getDoc(userRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // Handle the case where user data does not exist in Firestore
            console.log("No user data found in Firestore");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [currentUser]);

  const startSinglePlayerGame = () => {
    navigate("/game/singleplayer");
  };

  const startMultiPlayerGame = () => {
    navigate("/game/multiplayer");
  };
  return (
    <div className="user-profile">
      <h2>{userData?.name || "User"}</h2>
      <div className="stats">
        <p>Wins: {userData?.wins || 0}</p>
        <p>Losses: {userData?.losses || 0}</p>
        <p>Draws: {userData?.draws || 0}</p>
      </div>
      <button onClick={startSinglePlayerGame} className="play-button">
        Play
      </button>
      <button onClick={startMultiPlayerGame} className="play-button">
        Lobby
      </button>
    </div>
  );
};

export default UserProfile;
