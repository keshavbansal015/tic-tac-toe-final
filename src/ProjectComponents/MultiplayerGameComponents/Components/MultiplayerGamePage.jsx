import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Board from "../../BoardComponents/Components/Board";
import { useNavigate, useParams } from "react-router-dom";
import { ref, onValue, set, remove } from "firebase/database";
import { database } from "../../../firebaseConfig";

const MultiplayerGamePage = () => {
  const [gameData, setGameData] = useState(null);
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const matchStateRef = ref(database, `games/${matchId}`);
    const unsubscribe = onValue(matchStateRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGameData(data);
      }
    });

    return () => unsubscribe();
  }, [matchId]);

  const handleSquareClick = (index) => {
    // console.log(index)
    if (!gameData || gameData.matchState[index] || currentUser.uid !== gameData.turn) return;

    const newBoard = [...gameData.matchState];
    newBoard[index] = currentUser.uid === gameData.player1Id ? 'X' : 'O';
    const nextTurn = currentUser.uid === gameData.player1Id ? gameData.player2Id : gameData.player1Id;

    set(ref(database, `games/${matchId}`), {
      ...gameData,
      matchState: newBoard,
      turn: nextTurn,
    });
  };

  const quitGame = () => {
    // Function to handle removing a player from the lobby
    const removePlayerFromLobby = (playerId) => {
      if (playerId) {
        remove(ref(database, `playersInLobby/${playerId}`))
          .catch(error => console.error("Error removing player from lobby:", error));
      }
    };
  
    // Remove players from the lobby
    removePlayerFromLobby(gameData.player1Id);
    removePlayerFromLobby(gameData.player2Id);
  
    // Remove game record from Firebase
    if (matchId) {
      remove(ref(database, `games/${matchId}`))
        .then(() => {
          // Navigate back to the lobby after successful removal
          navigate("/lobby");
        })
        .catch(error => {
          console.error("Error removing game record:", error);
          // Handle any errors, e.g., show a message to the user
        });
    } else {
      // Handle the case where matchId is not available
      console.error("No matchId found");
      navigate("/lobby");
    }
  };
  
  return (
    <div>
      {/* <h1>Game: {matchId}</h1> */}
      <h2>{gameData?.player1Name} vs {gameData?.player2Name}</h2>
      <div className="multiplayer-game-container">
        <Board board={gameData?.matchState || []} onSquareClick={handleSquareClick} />
        <button onClick={quitGame}>Quit Game</button>
      </div>
    </div>
  );
};

export default MultiplayerGamePage;

  // get game data
  // handle user click
    // check if user's turn
    // lobby turn: true = first player, else second player
    // first player always O, second always X
    // update board, and state in database, 
    // have a listener to the state
  // check winner,
    // update database record, send back to lobby
    // add reset game, switch turn this time (optional)
  // 


  // const quitGame = () => {
  //   // Remove game record
  //   remove(ref(database, `games/${matchId}`));

  //   // Remove players from the lobby
  //   if (players.player1) {
  //     remove(ref(database, `playersInLobby/${players.player1.uid}`));
  //   }
  //   if (players.player2) {
  //     remove(ref(database, `playersInLobby/${players.player2.uid}`));
  //   }

  //   // Remove game record
  //   if (matchId) {
  //     remove(ref(database, `games/${matchId}`));
  //   }
  //   // Navigate back to the lobby
  //   navigate("/lobby");
  // };