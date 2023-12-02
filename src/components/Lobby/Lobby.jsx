import React, { useState, useEffect, useContext } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import generateGameCode from "../../utils/generateCode";
import { useNavigate } from "react-router-dom";
import { app, auth, db, database } from "../../firebaseConfig";
import { AuthContext } from "../../contexts/AuthContext";

const Lobby = () => {
  const [games, setGames] = useState([]);
  const [gameCodeInput, setGameCodeInput] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser?.uid;

  useEffect(() => {
    const gamesRef = ref(database, "games");
    // Attach the listener
    onValue(gamesRef, (snapshot) => {
      const gamesData = snapshot.val();
      const availableGames = gamesData
        ? Object.entries(gamesData)
            .filter(([_, game]) => !game.player2)
            .map(([id, game]) => ({ id, ...game }))
        : [];
      setGames(availableGames);
    });

    // Return a cleanup function
    // return () => {
    //     console.log('Detaching listener', gamesRef);
    //   // Correct way to detach the listener
    //   gamesRef.off("value");
    // };
  }, []);

  const createGame = () => {
    const newGameCode = generateGameCode();
    if (!currentUserId) {
      console.error("User ID is undefined. Cannot create a game.");
      return; // Exit the function if the user ID is not available
    }
    set(ref(database, `games/${newGameCode}`), {
      player1: currentUserId,
      player2: null,
      board: Array(9).fill(null),
      currentPlayer: currentUserId,
    });
    // Navigate to the game component with newGameCode
    navigate(`/game/${newGameCode}`);
  };

  const joinGame = (gameCode) => {
    const gameRef = ref(database, `games/${gameCode}`);
    set(gameRef, { player2: currentUserId });
    // Navigate to the game component with gameCode
    navigate(`/game/${gameCode}`);
  };

  return (
    <div>
      <button onClick={createGame}>Create Game</button>
      <input
        type="text"
        value={gameCodeInput}
        onChange={(e) => setGameCodeInput(e.target.value)}
        placeholder="Enter Game Code"
      />
      <button onClick={() => joinGame(gameCodeInput)}>Join Game</button>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            Game Code: {game.id}
            <button onClick={() => joinGame(game.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
