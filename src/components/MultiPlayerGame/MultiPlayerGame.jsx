import React, { useState, useEffect } from 'react';
import { getDatabase, ref, set, onValue, push, remove } from 'firebase/database';
import Board from '../Board/Board'; // Your existing Board component
import calculateWinner from '../../utils/calculateWinner'; // Function to calculate the winner
// import { db, auth, database, app } from "../../firebaseConfig";


function MultiplayerGame() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [gameId, setGameId] = useState('');
    const [isPlayerTurn, setIsPlayerTurn] = useState(false); // This might be determined by the game room
    const [playerMark, setPlayerMark] = useState('X'); // 'X' or 'O', assigned when joining the game
    const database = getDatabase();

    useEffect(() => {
        // If gameId is set, join the game
        if (gameId) {
            const gameRef = ref(database, 'games/' + gameId);

            // Listen for game updates
            onValue(gameRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setBoard(data.board);
                    setIsPlayerTurn(data.nextTurn === playerMark);
                }
            });

            return () => {
                // Cleanup listener on component unmount
                remove(gameRef);
            };
        }
    }, [gameId, database, playerMark]);

    const createGame = () => {
        // Logic to create a new game room in Firebase
        const newGameRef = push(ref(database, 'games'));
        setGameId(newGameRef.key);
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true); // The creator gets the first turn
        setPlayerMark('X'); // The creator is 'X'
        set(newGameRef, { board: Array(9).fill(null), nextTurn: 'X' });
    };

    const joinGame = (id) => {
        // Logic to join an existing game room
        setGameId(id);
        setIsPlayerTurn(false); // The joiner waits for their turn
        setPlayerMark('O'); // The joiner is 'O'
    };

    const handleMove = (index) => {
        if (isPlayerTurn && !board[index] && !calculateWinner(board)) {
            const newBoard = [...board];
            newBoard[index] = playerMark;
            setBoard(newBoard);
            setIsPlayerTurn(false);

            // Update the board and next turn in Firebase
            set(ref(database, 'games/' + gameId), {
                board: newBoard,
                nextTurn: playerMark === 'X' ? 'O' : 'X'
            });
        }
    };

    const winner = calculateWinner(board);

    return (
        <div className="multiplayer-game">
            {!gameId && (
                <div>
                    <button onClick={createGame}>Create New Game</button>
                    <button onClick={() => joinGame(prompt("Enter Game ID:"))}>Join Game</button>
                </div>
            )}
            {gameId && (
                <>
                    <Board board={board} onSquareClick={handleMove} />
                    <div className="game-info">
                        <div>{winner ? `Winner: ${winner}` : (isPlayerTurn ? "Your Turn" : "Opponent's Turn")}</div>
                        <div>Game ID: {gameId}</div>
                    </div>
                </>
            )}
        </div>
    );
}

export default MultiplayerGame;