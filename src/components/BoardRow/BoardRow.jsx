import React from 'react';
import "./BoardRow.css";  // Ensure you have BoardRow.css for styling
import Square from '../Square/Square'; // Assuming you have a Square component

const BoardRow = ({ row, board, onClick }) => {
    return (
        <div className="board-row">
            {Array(3).fill(null).map((_, col) => {
                const index = row * 3 + col;
                return (
                    // <button 
                    //     key={index} 
                    //     className="square" 
                    //     onClick={() => onClick(index)}
                    // >
                    //     {board[index]}
                    // </button>
                    <Square 
                        key={index} 
                        value={board[index]} 
                        onClick={() => onClick(index)} 
                    />
                );
            })}
        </div>
    );
};

export default BoardRow;