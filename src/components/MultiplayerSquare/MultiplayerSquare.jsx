import React from 'react';

const MultiplayerSquare = ({ value, onClick }) => {
    return (
        <button className="multiplayer-square" onClick={onClick}>
            {value}
        </button>
    );
};

export default MultiplayerSquare;
