import React from "react";
import "../CSS/Board.css";
import Square from "./Square";

function Board({ board, onSquareClick }) {
  return (
    <div className="game-container">
      <div className="board">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <div key={row} className="board-row">
              {Array(3)
                .fill(null)
                .map((_, col) => {
                  const index = row * 3 + col;
                  return (
                    <Square
                      key={index}
                      value={board[index]}
                      onClick={() => onSquareClick(index)}
                      className="board-square"
                    />
                  );
                })}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Board;
