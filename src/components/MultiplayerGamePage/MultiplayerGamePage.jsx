import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue, update } from "firebase/database";
import MultiplayerBoard from "../MultiplayerBoard/MultiplayerBoard";

const MultiplayerGamePage = () => {
  const { gameCode } = useParams();
  const database = getDatabase();
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
  }, [gameCode, database]);

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

  return (
    <div className="multiplayer-game-page">
      <h1>Multiplayer Tic-Tac-Toe</h1>
      <h2>Game Code: {gameCode}</h2>
      {gameData.board && (
        <MultiplayerBoard board={gameData.board} onSquareClick={handleMove} />
      )}
      {/* Additional game info and components */}
    </div>
  );
};

export default MultiplayerGamePage;
