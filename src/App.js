import logo from "./logo.svg";
import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LandingPage from "./components/LandingPage/LandingPage";
import GamePage from "./components/GamePage/GamePage";
import NavBar from "./components/NavBar/NavBar";
import UserProfile from "./components/UserProfile/UserProfile"; // Your user profile component
import Login from "./components/Login/Login"; // Your login component
import "./App.css";


function App() {
    return (
      <AuthProvider>
        <Router>
        <NavBar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              } />
            <Route 
              path="/game" 
              element={
                <ProtectedRoute>
                    <GamePage />
                </ProtectedRoute>
              } />

          </Routes>
        </Router>
      </AuthProvider>
    );
  }
  

export default App;
