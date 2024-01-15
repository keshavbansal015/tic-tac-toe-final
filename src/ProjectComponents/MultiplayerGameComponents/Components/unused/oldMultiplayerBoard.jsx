import React from "react";
import MultiplayerSquare from "./MultiplayerSquare";

const MultiplayerBoard = ({ board, onSquareClick }) => {
  if (!board) {
    console.error("Board data is undefined");
    return null;
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
