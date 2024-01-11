// Navigation / Routing
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";

// View components
// Other Components
import NavBar from "./ProjectComponents/OtherComponents/Components/NavBar";
import LandingPage from "./ProjectComponents/OtherComponents/Components/LandingPage";
import UserProfile from "./ProjectComponents/OtherComponents/Components/UserProfile";
import ProtectedRoute from "./ProjectComponents/OtherComponents/Components/ProtectedRoute";
// SingpleplayerGameComponents
import SinglePlayerGame from "./ProjectComponents/SinglePlayerGameComponents/Components/SinglePlayerGame";
// MultiplayerGameComponents
import Lobby from "./ProjectComponents/MultiplayerGameComponents/Components/Lobby";
import MultiplayerGamePage from "./ProjectComponents/MultiplayerGameComponents/Components/MultiplayerGamePage";
import MultiplayerGame from "./ProjectComponents/MultiplayerGameComponents/Components/MultiPlayerGame";
// Assets
import "./App.css";

// Others
import { AuthProvider } from "./contexts/AuthContext";
import React from "react";

const ProtectedRouteWrapper = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="page-content">
          <Routes>
            <Route path={ROUTES.LOGIN} element={<LandingPage />} />
            <Route path={ROUTES.HOME} element={<LandingPage />} />
            <Route
              path={ROUTES.PROFILE}
              element={
                <ProtectedRouteWrapper>
                  <UserProfile />
                </ProtectedRouteWrapper>
              }
            />

            {/* Single Player game */}
            <Route
              path={ROUTES.GAME_SINGLEPLAYER}
              element={
                <ProtectedRouteWrapper>
                  <SinglePlayerGame />
                </ProtectedRouteWrapper>
              }
            />

            {/* Multiplayer game */}
            <Route
              path={`${ROUTES.GAME}/:matchId`}
              element={
                <ProtectedRouteWrapper>
                  {/* <MultiplayerGamePage /> */}
                  <MultiplayerGame />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path={ROUTES.GAME_MULTIPLAYER}
              element={
                <ProtectedRouteWrapper>
                  <Lobby />
                </ProtectedRouteWrapper>
              }
            />
            <Route
              path={ROUTES.LOBBY}
              element={
                <ProtectedRouteWrapper>
                  <Lobby />
                </ProtectedRouteWrapper>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
