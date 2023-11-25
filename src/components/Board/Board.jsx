import React, { useState } from "react";
import BoardRow from "../BoardRow/BoardRow";
import "./Board.css";  // Ensure you have Board.css for styling
import calculateWinner from "../../utils/calculateWinner";

function Board() {
    const initialBoard = Array(9).fill(null); // Initialize an empty game board
    const [board, setBoard] = useState(initialBoard);
    const [xIsNext, setXIsNext] = useState(true); // To track whose turn it is

    const computerMove = (newBoard) => {
        // Find the first available (null) square
        const emptyIndices = newBoard.map((square, index) => square === null ? index : null).filter(index => index !== null);
        if (emptyIndices.length === 0) return; // No available moves
    
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)]; // Choose a random empty square
        newBoard[randomIndex] = 'O'; // Computer plays as 'O'
        setBoard(newBoard);
    };

    // Reset game function
    const resetGame = () => {
        setBoard(initialBoard);
        setXIsNext(true);
    };

    const winner = calculateWinner(board);
    const isBoardFull = board.every((cell) => cell !== null);

    const statusMessage = winner
        ? `Winner: ${winner}`
        : isBoardFull
        ? 'Tie Game!'
        : `Next Player: ${xIsNext ? 'X' : 'O'}`;



    // Function to handle a move
    const handleClick = (index) => {
        const newBoard = [...board];
        if (calculateWinner(board) || newBoard[index]) {
            return; // Return if game is won or square is filled
        }
        newBoard[index] = 'X';
        setBoard(newBoard);
        // setXIsNext(!xIsNext);
    // };
        if (!calculateWinner(newBoard)) {
            computerMove(newBoard);
        }
    };

    return (
        <div>
            <div className="status">{statusMessage}</div>
            <div className="game-board">
                {Array(3).fill(null).map((_, row) => (
                    <BoardRow key={row} row={row} board={board} onClick={handleClick} />
                ))}
            </div>
            <button className="reset-button" onClick={resetGame}>New Game</button>
        </div>
    );
}

export default Board;
