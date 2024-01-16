import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import Board from "../../BoardComponents/Components/Board";
import { useNavigate, useParams } from "react-router-dom";
import { ref, onValue, set, remove, get } from "firebase/database";
import { database } from "../../../firebaseConfig";
import "../CSS/MultiplayerGamePage.css";

import calculateWinner from "../../../utils/calculateWinner";
import updateUserStats from "../../../utils/updateUserStats";

const MultiplayerGamePage = () => {
  const [gameData, setGameData] = useState(null);
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Reference to the specific game in Firebase
    const gameRef = ref(database, `games/${matchId}`);

    // Fetch and set the initial game data
    const fetchGameData = async () => {
      const snapshot = await get(gameRef);
      if (snapshot.exists()) {
        setGameData(snapshot.val());
      } else {
        console.log("No data available for this game.");
      }
    };

    fetchGameData();

    // Subscribe to game data changes for real-time updates
    const unsubscribeGame = onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        setGameData(snapshot.val());
      }
    });

    return () => unsubscribeGame();
  }, [matchId]);

  const handleSquareClick = (index) => {
    console.log(gameData);
    // Check if gameData and matchState are defined
    if (
      !gameData ||
      !gameData.matchState ||
      typeof gameData.matchState[index] === "undefined" ||
      currentUser.uid !== gameData.turn
    ) {
      return;
    }

    // Proceed if the clicked square is empty
    if (gameData.matchState[index] !== ".") return;

    const newBoard = [...gameData.matchState];
    newBoard[index] = currentUser.uid === gameData.player1Id ? "X" : "O";
    const nextTurn =
      currentUser.uid === gameData.player1Id
        ? gameData.player2Id
        : gameData.player1Id;

    const winner = calculateWinner(newBoard);
    let result = null;
    if (winner) {
      result = winner === "X" ? gameData.player1Id : gameData.player2Id;
      updateUserStats(
        gameData.player1Id,
        result === gameData.player1Id ? "wins" : "losses"
      );
      updateUserStats(
        gameData.player2Id,
        result === gameData.player2Id ? "wins" : "losses"
      );
    } else if (newBoard.every((cell) => cell !== ".")) {
      result = "draw";
      updateUserStats(gameData.player1Id, "draws");
      updateUserStats(gameData.player2Id, "draws");
    }

    set(ref(database, `games/${matchId}`), {
      ...gameData,
      matchState: newBoard,
      turn: winner ? null : nextTurn,
      result: result,
    });
  };

  const quitGame = () => {
    // Check if gameData is not null
    if (!gameData) {
      console.error("Game data is not available.");
      navigate("/lobby");
      return;
    }

    // Remove game record from Firebase
    if (matchId) {
      remove(ref(database, `games/${matchId}`))
        .then(() => navigate("/lobby"))
        .catch((error) => console.error("Error removing game record:", error));
    } else {
      console.error("No matchId found");
      navigate("/lobby");
    }
  };

  // Determine the player's name whose turn it is
  const playerTurnName = gameData
    ? gameData.turn === gameData.player1Id
      ? gameData.player1Name
      : gameData.player2Name
    : "";

  // Function to determine if there is a winner and return their name
  const getWinnerName = () => {
    if (!gameData) return null;
    const winner = calculateWinner(gameData.matchState);
    if (winner === "X") return gameData.player1Name;
    if (winner === "O") return gameData.player2Name;
    return null;
  };

  const winnerName = getWinnerName();
  const isDraw =
    gameData &&
    gameData.matchState.every((cell) => cell !== ".") &&
    !winnerName;

  // Function to determine the class for each player based on the game state
  const playerClass = (playerName) => {
    if (winnerName) {
      return winnerName === playerName ? "winner" : "loser";
    }
    if (isDraw) return "draw";
    return "";
  };

  const gameStatus = () => {
    if (winnerName) return `Winner: ${winnerName}`;
    if (isDraw) return "Game Draw";
    return `Turn: ${gameData.turn === gameData.player1Id ? gameData.player1Name : gameData.player2Name}`;
  };


  return (
    <div className="multiplayer-game-page">
      <h2>
        <span className={playerClass(gameData?.player1Name)}>
          {gameData?.player1Name}
        </span>
        <span>  vs  </span>
        <span className={playerClass(gameData?.player2Name)}>
          {gameData?.player2Name}
        </span>
      </h2>
      <h4>{gameStatus()}</h4>
      <div>
        <Board
          board={gameData?.matchState || []}
          onSquareClick={handleSquareClick}
        />
        <button className="button-game" onClick={quitGame}>
          Quit Game
        </button>
      </div>
    </div>
  );
};

export default MultiplayerGamePage;
