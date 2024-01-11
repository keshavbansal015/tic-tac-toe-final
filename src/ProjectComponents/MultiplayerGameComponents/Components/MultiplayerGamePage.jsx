import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ref, getDatabase, update, onValue, remove } from 'firebase/database';
import { database } from '../../../firebaseConfig';
import { AuthContext } from '../../../contexts/AuthContext';


const MultiplayerGamePage = () => {
    const [players, setPlayers] = useState({ player1: null, player2: null });
    const { matchId } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        // Fetch game details including player info
        const gameRef = ref(database, `ongoingMatches/${matchId}`);
        const unsubscribe = onValue(gameRef, (snapshot) => {
            const gameData = snapshot.val();
            if (gameData) {
                // Assuming gameData contains player IDs
                fetchPlayerDetails(gameData.player1Id, 'player1');
                fetchPlayerDetails(gameData.player2Id, 'player2');
            }
        });

        return () => unsubscribe();
    }, [matchId]);

    const fetchPlayerDetails = (playerId, playerKey) => {
        const userRef = ref(database, `users/${playerId}`);
        onValue(userRef, (snapshot) => {
            setPlayers(prevPlayers => ({
                ...prevPlayers,
                [playerKey]: { id: playerId, ...snapshot.val() }
            }));
        });
    };

    const quitGame = () => {
        // Logic to handle game termination
        // Remove game record from Firebase
        remove(ref(database, `ongoingMatches/${matchId}`));

        // Remove pendingGame property for both players
        if (players.player1) {
            remove(ref(database, `users/${players.player1.id}/pendingGame`));
        }
        if (players.player2) {
            remove(ref(database, `users/${players.player2.id}/pendingGame`));
        }

        // Redirect both players to the lobby
        navigate('/lobby');
    };

    return (
        <div>
            <h1>GameCode: {matchId}</h1>
            <div>
                <h2>{players.player1?.username} vs {players.player2?.username}</h2>
            </div>
            {/* <MultiplayerBoard /> */}
            <button onClick={quitGame}>Quit Game</button>
        </div>
    );
};

export default MultiplayerGamePage;
