import React, { useState, useEffect, useContext } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { database, db } from "../../firebaseConfig";
import { AuthContext } from "../../contexts/AuthContext";
import generateGameCode from "../../utils/generateCode";
import "./Lobby.css";


const Lobby = () => {
  const [usersInLobby, setUsersInLobby] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser?.uid;

  useEffect(() => {
    const usersRef = ref(database, "usersInLobby");
    const userGameCode = generateGameCode();

    // Function to fetch usernames from Firestore
    const fetchUsernames = async (usersData) => {
      if (!usersData) return;

      try {
        const usersPromises = Object.entries(usersData)
          .filter(([id, _]) => id !== currentUserId)
          .map(async ([id, value]) => {
            const userDoc = await getDoc(doc(db, "users", id));
            const username = userDoc.exists()
              ? userDoc.data().username
              : "Unknown User";
            return { id, username, gameCode: value.gameCode };
          });

        const resolvedUsers = await Promise.all(usersPromises);
        setUsersInLobby(resolvedUsers);
      } catch (error) {
        console.error("Error fetching usernames: ", error);
      }
    };

    if (currentUserId) {
      set(ref(database, `usersInLobby/${currentUserId}`), {
        gameCode: userGameCode,
      }).catch((error) => console.error("Error adding user to lobby: ", error));
    }

    const unsubscribe = onValue(usersRef, (snapshot) => {
      fetchUsernames(snapshot.val());
    });

    return () => {
      unsubscribe();
      if (currentUserId) {
        remove(ref(database, `usersInLobby/${currentUserId}`)).catch((error) =>
          console.error("Error removing user from lobby: ", error)
        );
      }
    };
  }, [currentUserId]);

  const joinGame = (gameCode) => {
    navigate(`/multiplayer-game/${gameCode}`);
    if (currentUserId) {
      remove(ref(database, `usersInLobby/${currentUserId}`)).catch((error) =>
        console.error("Error removing user from lobby: ", error)
      );
    }
  };

  //   return (
  //     <div>
  //       <h2>Lobby</h2>
  //       <ul>
  //         {usersInLobby.map((user) => (
  //           <li key={user.id} onClick={() => joinGame(user.gameCode)}>
  //             {user.id}
  //              {/* - Game Code: {user.gameCode} */}
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // };

  return (
    <div>
      <h2>Lobby</h2>
      <ul>
        {usersInLobby.map((user) => (
          <li key={user.id} onClick={() => joinGame(user.gameCode)}>
            <button className="button-game">
              {/* Username:  */}
              {user.id}
              {/* - Game Code: {user.gameCode} */}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
