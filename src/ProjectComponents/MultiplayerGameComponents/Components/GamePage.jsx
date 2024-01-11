import React, { useState, useEffect } from "react";
import Board from "../../BoardComponents/Components/Board";
import { app, auth, db, database } from "../../../firebaseConfig";
import { useParams, useNavigate } from "react-router-dom";
import { getDatabase, ref, onValue, update } from "firebase/database";

const GamePage = () => {
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [gameData, setGameData] = useState({
    board: Array(9).fill(null),
    currentPlayer: null,
  });

  useEffect(() => {
    const gameRef = ref(database, `games/${gameCode}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setGameData(data);
      } else {
        setGameData({ board: Array(9).fill(null), currentPlayer: null });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [gameCode]);

  const handleMove = (index) => {
    if (
      gameData &&
      gameData.board &&
      typeof gameData.currentPlayer === "string"
    ) {
      const newBoard = [...gameData.board];
      newBoard[index] = gameData.currentPlayer;
      const nextPlayer =
        gameData.currentPlayer === gameData.player1
          ? gameData.player2
          : gameData.player1;

      update(ref(database, `games/${gameCode}`), {
        board: newBoard,
        currentPlayer: nextPlayer,
      });
    }
  };

  const restartGame = () => {
    if (gameData && gameData.player1) {
      update(ref(database, `games/${gameCode}`), {
        board: Array(9).fill(null),
        currentPlayer: gameData.player1,
      });
    } else {
      console.error("Unable to restart game: player1 is undefined");
      // Handle the scenario appropriately
    }
  };

  const backToLobby = () => {
    navigate("/lobby");
  };

  return (
    <div className="game-page">
      <h1>Tic-Tac-Toe</h1>
      <h2>Game Code: {gameCode}</h2>
      {gameData.currentPlayer && (
        <p>Current Turn: Player {gameData.currentPlayer}</p>
      )}
      <Board
        board={gameData.board}
        onSquareClick={handleMove}
        currentPlayer={gameData.currentPlayer}
      />
      <button onClick={restartGame}>Restart Game</button>
      <button onClick={backToLobby}>Back to Lobby</button>
      {/* You can add more game-related information or components here */}
    </div>
  );
};

export default GamePage;
