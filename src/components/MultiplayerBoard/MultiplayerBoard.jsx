import React from "react";
import MultiplayerSquare from "../MultiplayerSquare/MultiplayerSquare"; // New Square component for multiplayer

const MultiplayerBoard = ({ board, onSquareClick }) => {
  if (!board) {
    console.error("Board data is undefined");
    return null; // Or render some fallback UI
  }
  return (
    <div className="multiplayer-board">
      {board.map((value, index) => (
        <MultiplayerSquare
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
};

export default MultiplayerBoard;
