// import Board from "../../BoardComponents/Components/Board";
// import React, { useState, useEffect } from "react";
// import calculateWinner from "../../../utils/calculateWinner";
// import { db, auth, database, app } from "../../../firebaseConfig";
// import "../CSS/MultiplayerGame.css";
// import {
//   getDatabase,
//   ref,
//   set,
//   onValue,
//   push,
//   query,
//   equalTo,
//   orderByChild,
// } from "firebase/database";

// function MultiplayerGame() {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [gameId, setGameId] = useState("");
//   const [isPlayerTurn, setIsPlayerTurn] = useState(false);
//   const [playerMark, setPlayerMark] = useState("X");
//   const [playerId, setPlayerId] = useState(""); // Add logic to get current player's ID
//   const database = getDatabase();

//   useEffect(() => {
//     if (gameId) {
//       const gameRef = ref(database, "games/" + gameId);

//       // Store the listener
//       const listener = onValue(gameRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           setBoard(data.board);
//           setIsPlayerTurn(data.nextTurn === playerId);
//         }
//       });

//       return () => {
//         // Detach the listener on component unmount
//         gameRef.off("value", listener);
//       };
//     }
//   }, [gameId, database, playerId]);

//   const generateGameCode = () => {
//     // Implement logic to generate a unique 6-byte alphanumeric code
//     const characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     let result = "";
//     for (let i = 0; i < 6; i++) {
//       result += characters.charAt(
//         Math.floor(Math.random() * characters.length)
//       );
//     }
//     return result;
//   };

//   const createGame = () => {
//     const uniqueGameCode = generateGameCode();
//     const newGameRef = ref(database, "games/" + uniqueGameCode);
//     setGameId(uniqueGameCode);
//     setBoard(Array(9).fill(null));
//     setIsPlayerTurn(true);
//     setPlayerMark("X");
//     set(newGameRef, {
//       board: Array(9).fill(null),
//       nextTurn: playerId,
//       player1: playerId,
//       player2: null,
//     });
//   };

//   const joinGame = async (gameCode) => {
//     const gameQuery = query(
//       ref(database, "games"),
//       orderByChild("gameCode"),
//       equalTo(gameCode)
//     );
//     const snapshot = await onValue(gameQuery);
//     if (snapshot.exists()) {
//       const gameData = snapshot.val();
//       if (!gameData.player2) {
//         set(ref(database, "games/" + gameCode + "/player2"), playerId);
//         setGameId(gameCode);
//         setIsPlayerTurn(false);
//         setPlayerMark("O");
//       } else {
//         alert("Game is full or does not exist");
//       }
//     }
//   };

//   const handleMove = (index) => {
//     if (isPlayerTurn && !board[index] && !calculateWinner(board)) {
//       const newBoard = [...board];
//       newBoard[index] = playerMark;
//       setBoard(newBoard);
//       setIsPlayerTurn(false);

//       // Update the board and next turn in Firebase
//       set(ref(database, "games/" + gameId), {
//         board: newBoard,
//         nextTurn: playerMark === "X" ? "O" : "X",
//       });
//     }
//   };

//   const winner = calculateWinner(board);

//   return (
//     <div className="multiplayer-game">
//       {!gameId && (
//         <div className="game-setup">
//           <button onClick={createGame}>Create New Game</button>
//           <div className="join-game">
//             <input
//               type="text"
//               value={gameId}
//               onChange={(e) => setGameId(e.target.value)}
//               placeholder="Enter Game ID"
//             />
//             <button onClick={() => joinGame(gameId)}>Join Game</button>
//           </div>
//         </div>
//       )}
//       {gameId && (
//         <div className="game-board">
//           <Board board={board} onSquareClick={handleMove} />
//           <div className="game-info">
//             <div>
//               {winner
//                 ? `Winner: ${winner}`
//                 : isPlayerTurn
//                 ? "Your Turn"
//                 : "Opponent's Turn"}
//             </div>
//             <div>Game ID: {gameId}</div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MultiplayerGame;
