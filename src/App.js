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
import UserProfile from "./components/UserProfile/UserProfile"; // Your user profile component
import Login from "./components/Login/Login"; // Your login component
import "./App.css";

// const AuthenticatedApp = () => {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(AuthContext);

//   useEffect(() => {
//     if (currentUser) {
//       navigate("/profile");
//     } else {
//       navigate("/login");
//     }
//   }, [currentUser, navigate]);

//   return (
//     <Routes>
//       <Route path="/" element={<LandingPage />} />
//       <Route path="/login" element={<Login />} />
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <UserProfile />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//   );
// };

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <AuthenticatedApp />
//       </Router>
//     </AuthProvider>
//   );
// }


function App() {
    return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    );
  }
  

export default App;
