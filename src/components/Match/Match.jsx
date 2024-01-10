import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../../firebaseConfig";
import { ref, set, onValue, remove } from "firebase/database";
const MatchComponent = () => {
    const { matchId } = useParams();
    const [matchDetails, setMatchDetails] = useState(null);

    useEffect(() => {
        const matchRef = ref(database, `ongoingMatches/${matchId}`);
        onValue(matchRef, (snapshot) => {
            setMatchDetails(snapshot.val());
        });

        return () => {
            remove(matchRef);
        };
    }, [matchId]);

    if (!matchDetails) {
        return <div>Loading match...</div>;
    }

    return (
        <div className="match">
            <h2>Game {matchId}</h2>
            {/* Game logic goes here */}
        </div>
    );
};

export default MatchComponent;
