import React, { useState, useEffect, useCallback, useContext } from "react";
import Board from "../Board/Board";
import calculateWinner from "../../utils/calculateWinner";
import updateUserStats from "../../utils/updateUserStats";
import { AuthContext } from "../../contexts/AuthContext";
import "./SinglePlayerGame.css";

function SinglePlayerGame() {
    const initialBoard = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoard);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const { currentUser } = useContext(AuthContext);

    const computerMove = useCallback(() => {
        const emptyIndices = board
            .map((square, index) => (square === null ? index : null))
            .filter((index) => index !== null);
        if (emptyIndices.length === 0) return;

        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        const newBoard = [...board];
        newBoard[randomIndex] = "O";
        setBoard(newBoard);
        setIsPlayerTurn(true); // Switch turn back to the player
    }, [board, setBoard]);

    const handlePlayerMove = (index) => {
        if (!board[index] && isPlayerTurn && !calculateWinner(board)) {
            const newBoard = [...board];
            newBoard[index] = "X";
            setBoard(newBoard);
            setIsPlayerTurn(false);
        }
    };

    const onGameEnd = useCallback((result) => {
        if (currentUser) {
            updateUserStats(currentUser.uid, result);
        }
    }, [currentUser]);

    useEffect(() => {
        const winner = calculateWinner(board);
        if (winner) {
            onGameEnd(winner === "X" ? "wins" : "losses");
        } else if (board.every((cell) => cell !== null)) {
            onGameEnd("draws");
        } else if (!isPlayerTurn && !winner) {
            setTimeout(computerMove, 500); // Delay for the computer's move
        }
    }, [board, isPlayerTurn, onGameEnd, computerMove]);

    const resetGame = useCallback(() => {
        setBoard(initialBoard);
        setIsPlayerTurn(true); // Reset to player's turn
    }, [initialBoard]);

    const winner = calculateWinner(board);

    return (
        <div className="single-player-game">
            <Board board={board} onSquareClick={handlePlayerMove} />
            {winner && <p>Winner: {winner}</p>}
            <button onClick={resetGame}>Reset Game</button>
        </div>
    );
}

export default SinglePlayerGame;
