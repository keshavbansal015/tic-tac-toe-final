import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import "../CSS/NavBar.css";

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign Out Error:", error);
      });
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      {currentUser ? (
        <>
          <Link to="/profile">Profile</Link>
          <button className="sign-out" onClick={handleSignOut}>
            Sign Out
          </button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default NavBar;
