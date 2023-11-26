import React, { useState } from "react";
import calculateWinner from "../../utils/calculateWinner"; // Function to calculate the winner
import Board from "../Board/oldBoard"; // Your existing Board component
import "./SinglePlayerGame.css";

function SinglePlayerGame() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);

  const winner = calculateWinner(board);
  return (
    <div className="single-player-game">
      {/* <Board board={board} /> */}
      <Board />
      {winner && <p>Winner:gh {winner}</p>}
    </div>
  );
}

export default SinglePlayerGame;
