import React, { useState, useEffect, useCallback, useContext } from "react";
import Board from "../../BoardComponents/Components/Board";
import calculateWinner from "../../../utils/calculateWinner";
import updateUserStats from "../../../utils/updateUserStats";
import { AuthContext } from "../../../contexts/AuthContext";
import "../CSS/SinglePlayerGame.css";

function SinglePlayerGame() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const { currentUser } = useContext(AuthContext);

  const isBoardFull = board.every((cell) => cell !== null);
  const winner = calculateWinner(board);

  const computerMove = useCallback(() => {
    const emptyIndices = board
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);
    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...board];
    newBoard[randomIndex] = "O";
    setBoard(newBoard);
    setIsPlayerTurn(true);
  }, [board]);

  const handlePlayerMove = (index) => {
    if (board[index] || !isPlayerTurn || winner) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const onGameEnd = useCallback(
    (result) => {
      if (currentUser) {
        updateUserStats(currentUser.uid, result);
      }
    },
    [currentUser]
  );

  useEffect(() => {
    if (winner) {
      onGameEnd(winner === "X" ? "wins" : "losses");
    } else if (isBoardFull) {
      onGameEnd("draws");
    } else if (!isPlayerTurn) {
      setTimeout(computerMove, 500);
    }
  }, [board, isPlayerTurn, winner, isBoardFull, onGameEnd, computerMove]);

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
  };

  return (
    <div className="single-player-game">
      {winner && <div className="single-player-status">Winner: {winner}</div>}
      <div className="single-player-board">
        <Board board={board} onSquareClick={handlePlayerMove} />
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default SinglePlayerGame;
