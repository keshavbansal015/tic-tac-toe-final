import React from 'react';
import "./BoardRow.css";  // Ensure you have BoardRow.css for styling

const BoardRow = ({ row, board, onClick }) => {
    return (
        <div className="board-row">
            {Array(3).fill(null).map((_, col) => {
                const index = row * 3 + col;
                return (
                    <button 
                        key={index} 
                        className="square" 
                        onClick={() => onClick(index)}
                    >
                        {board[index]}
                    </button>
                );
            })}
        </div>
    );
};

export default BoardRow;
