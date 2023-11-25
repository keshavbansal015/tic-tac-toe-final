import React from 'react';
import Board from '../Board/Board'; // Assuming you have a Board component

const GamePage = () => {
    return (
        <div className="game-page">
            <h1>Tic-Tac-Toe</h1>
            <Board />
            {/* Add more game-related components or info here */}
        </div>
    );
};

export default GamePage;
