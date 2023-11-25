import React, { useState } from "react";
import BoardRow from "./BoardRow";
import "./Board.css";  // Ensure you have Board.css for styling

function Board() {
    const initialBoard = Array(9).fill(null); // Initialize an empty game board
    const [board, setBoard] = useState(initialBoard);
    const [xIsNext, setXIsNext] = useState(true); // To track whose turn it is

    // Function to calculate the winner
    const calculateWinner = (squares) => {
        // Winning combinations
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    // Function to handle a move
    const handleClick = (index) => {
        const newBoard = [...board];
        if (calculateWinner(board) || newBoard[index]) {
            return; // Return if game is won or square is filled
        }
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard);
        setXIsNext(!xIsNext);
    };

    return (
        <div className="game-board">
            {Array(3).fill(null).map((_, row) => (
                <BoardRow key={row} row={row} board={board} onClick={handleClick} />
            ))}
        </div>
    );
}

export default Board;
