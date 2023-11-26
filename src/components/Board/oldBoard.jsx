import calculateWinner from "../../utils/calculateWinner";
import BoardRow from "../BoardRow/BoardRow";
import React, { useState, useEffect, useContext, useCallback } from "react";
import "./Board.css"; // Ensure you have Board.css for styling
import { AuthContext } from "../../contexts/AuthContext";
import updateUserStats from "../../utils/updateUserStats";

function Board() {
  const initialBoard = Array(9).fill(null); // Initialize an empty game board
  const [board, setBoard] = useState(initialBoard);
  const { currentUser } = useContext(AuthContext);
  const [gameOver, setGameOver] = useState(false); // New state to track if the game is over

  const computerMove = () => {
    setBoard((prevBoard) => {
      if (
        calculateWinner(prevBoard) ||
        prevBoard.every((square) => square !== null)
      ) {
        // No move if the game is already over
        return prevBoard;
      }

      const emptyIndices = prevBoard
        .map((square, index) => (square === null ? index : null))
        .filter((index) => index !== null);
      if (emptyIndices.length === 0) {
        return prevBoard; // No available moves
      }

      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      const newBoard = [...prevBoard];
      newBoard[randomIndex] = "O";
      return newBoard;
    });
  };

  const handleClick = (index) => {
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard];
      if (
        newBoard[index] ||
        calculateWinner(newBoard) ||
        newBoard.every((cell) => cell !== null)
      ) {
        return newBoard; // Return if square is filled or game is over
      }
      newBoard[index] = "X";
      return newBoard;
    });
  };

  const onGameEnd = useCallback(
    (result) => {
      console.log("HEY WE ARE HERE");
      if (currentUser) {
        updateUserStats(currentUser.uid, result);
      }
    },
    [currentUser]
  );

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner && !gameOver) {
      onGameEnd(winner === "X" ? "wins" : "losses");
      setGameOver(true); // Set game over state to true
    } else if (board.every((cell) => cell !== null) && !gameOver) {
      onGameEnd("draws");
      setGameOver(true); // Set game over state to true
    } else if (!gameOver && board.filter((cell) => cell).length % 2 === 1) {
      // Trigger computer move if it's the computer's turn and game is not over
      setTimeout(computerMove, 500);
    }
  }, [board, onGameEnd, gameOver]);

  const resetGame = () => {
    setBoard(initialBoard);
    setGameOver(false); // Reset the game over state
  };

  const statusMessage = calculateWinner(board)
    ? `Winner: ${calculateWinner(board)}`
    : board.every((cell) => cell !== null)
    ? "Tie Game!"
    : `Next Player: ${
        board.filter((cell) => cell !== null).length % 2 === 0 ? "X" : "O"
      }`;

  return (
    <div>
      <div className="status">{statusMessage}</div>
      <div className="game-board">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <BoardRow key={row} row={row} board={board} onClick={handleClick} />
          ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        New Game
      </button>
    </div>
  );
}

export default Board;
