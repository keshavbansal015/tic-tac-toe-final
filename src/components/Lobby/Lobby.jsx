import React, { useState, useEffect, useContext } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { database, db } from "../../firebaseConfig";
import { AuthContext } from "../../contexts/AuthContext";
import generateGameCode from "../../utils/generateCode";
// import UserGameListener from "../UserGameListener/UserGameListener";
import "./Lobby.css";

const Lobby = () => {
  const [playersInLobby, setPlayersInLobby] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  useEffect(() => {
    // Join the lobby when the component mounts
    joinLobby(currentUser);

    const playersRef = ref(database, "playersInLobby/");
    const unsubscribe = onValue(playersRef, (snapshot) => {
      const players = snapshot.val();
      const playersList = players
        ? Object.keys(players).map((key) => ({
            id: key,
            ...players[key],
          }))
        : [];
      setPlayersInLobby(playersList);
    });

    const userRef = ref(database, `users/${currentUser.uid}`);
    const unsubscribeUser = onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.pendingMatch) {
        navigate(`/game/${userData.pendingMatch}`);
      }
    });

    // Leave the lobby when the component unmounts
    return () => {
      leaveLobby(currentUser);
      unsubscribe();
      unsubscribeUser();
    };
  }, [currentUser, navigate]);

  const joinLobby = (user) => {
    // Add the current user to the playersInLobby node
    set(ref(database, `playersInLobby/${user.uid}`), {
      name: user.displayName,
      uid: user.uid,
    });
  };

  const leaveLobby = (user) => {
    // Remove the user from the playersInLobby node
    remove(ref(database, `playersInLobby/${user.uid}`));
  };

  const handleSelectOpponent = (opponentId) => {
    const matchId = generateGameCode();
    set(ref(database, `ongoingMatches/${matchId}`), {
      player1Id: currentUser.uid,
      player1Name: currentUser.displayName,
      player2Id: opponentId,
      player2Name: ref(database, `users/${opponentId}`).name,
    });

    // Update the pendingMatch for both users
    set(ref(database, `users/${currentUser.uid}/pendingMatch`), matchId);
    set(ref(database, `users/${opponentId}/pendingMatch`), matchId);

    leaveLobby(currentUser);
    remove(ref(database, `playersInLobby/${opponentId}`));
    navigate(`/game/${matchId}`);
  };

  return (
    <div className="lobby">
      <h2>Lobby</h2>
      <ul>
        {playersInLobby
          .filter((player) => player.uid !== currentUser.uid) // Filter out the current player
          .map((player) => (
            <li key={player.uid}>
              <button
                className="button-game"
                onClick={() => handleSelectOpponent(player.uid)}
              >
                {player.name}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Lobby;
