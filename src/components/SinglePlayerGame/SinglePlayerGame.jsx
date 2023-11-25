import React, { useState, useEffect } from 'react';
import Board from '../Board/Board'; // Your existing Board component
import calculateWinner from '../../utils/calculateWinner'; // Function to calculate the winner
import './SinglePlayerGame.css';

function SinglePlayerGame() {
    const initialBoard = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);

    // Function to handle player's move
    const handlePlayerMove = (index) => {
        if (!board[index] && isPlayerTurn && !calculateWinner(board)) {
            const newBoard = [...board];
            newBoard[index] = 'X'; // Assuming the player is 'X'
            setBoard(newBoard);
            setIsPlayerTurn(false);
        }
    };

    // Function for computer's move (simple AI)
    const computerMove = () => {
        // Get empty squares
        const emptySquares = board.map((value, idx) => value === null ? idx : null).filter(v => v !== null);
        if (emptySquares.length === 0) return;

        // Random move
        const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        const newBoard = [...board];
        newBoard[randomIndex] = 'O'; // Assuming the computer is 'O'
        setBoard(newBoard);
        setIsPlayerTurn(true);
    };

    // Run computer's move when it's not the player's turn
    useEffect(() => {
        let timeout;
        if (!isPlayerTurn && !calculateWinner(board)) {
            timeout = setTimeout(() => {
                computerMove();
            }, 500); // A short delay before the computer move
        }
        return () => clearTimeout(timeout);
    }, [board, isPlayerTurn]);

    // Function to reset the game
    const resetGame = () => {
        setBoard(initialBoard);
        setIsPlayerTurn(true);
    };

    // Check for winner
    const winner = calculateWinner(board);

    return (
        <div className="single-player-game">
            <Board board={board} onSquareClick={handlePlayerMove} />
        </div>
    );
}

export default SinglePlayerGame;
