import React from "react";
import BoardRow from "../BoardRow/BoardRow";
import "./Board.css";

function Board({ board, onSquareClick }) {
  return (
    <div className="game-container">
      <div className="board">
        {Array(3)
          .fill(null)
          .map((_, row) => (
            <BoardRow
              key={row}
              row={row}
              board={board}
              onClick={onSquareClick}
            />
          ))}
      </div>
    </div>
  );
}

export default Board;
