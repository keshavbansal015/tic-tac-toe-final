import { ref, set, get, onValue, remove } from "firebase/database";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import generateGameCode from "../../../utils/generateCode";
import userTurnCode from "../../../utils/userTurn";
import { database} from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../CSS/Lobby.css";

const Lobby = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [playersInLobby, setPlayersInLobby] = useState([]);

  useEffect(() => {
    // Join the lobby when the component mounts
    joinLobby(currentUser);

    // set players display list from players in lobby
    const playersRef = ref(database, "playersInLobby/");
    const unsubscribe = onValue(playersRef, (snapshot) => {
      const players = snapshot.val();
      const playersList = players?Object.keys(players)
        .map((key) => ({id: key, ...players[key]})):[];
      setPlayersInLobby(playersList);
    });

    // redirect, if pendingMatch is set
    const userRef = ref(database, `playersInLobby/${currentUser.uid}`);
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

  //
  const joinLobby = (user) => {
    // Add the current user to the playersInLobby node
    set(ref(database, `playersInLobby/${user.uid}`), {
      name: user.displayName,
      uid: user.uid,
      pendingMatch: null,
    });
  };

  const leaveLobby = (user) => {
    // Remove the user from the playersInLobby node
    remove(ref(database, `playersInLobby/${user.uid}`));
  };

  const handleSelectOpponent = (opponentId) => {
    const matchId = generateGameCode();
    let turn = null
    const player2ref = ref(database, `playersInLobby/${opponentId}`);
    get(player2ref).then((snapshot) => {
      let player2Name__ = "";
      if (snapshot.exists()) {
        player2Name__ = snapshot.val().name;
      } else {
        player2Name__ = "Player 2";
      }

      if (userTurnCode()) {
        turn = currentUser.uid;
      } else {
        turn = opponentId
      }
      console.log(player2Name__)
      set(ref(database, `games/${matchId}`), {
        player1Id: currentUser.uid,
        player1Name: currentUser.displayName || "Player 1",
        player2Id: opponentId,
        player2Name: player2Name__,
        matchState: [".", ".", ".", ".", ".", ".", ".", ".", "."],
        result: "",
        turn:turn,
      });
    });

    // Update the pendingMatch for both users
    set(ref(database, `playersInLobby/${currentUser.uid}/pendingMatch`), matchId);
    set(ref(database, `playersInLobby/${opponentId}/pendingMatch`), matchId);

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
