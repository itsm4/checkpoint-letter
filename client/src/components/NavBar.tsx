import type React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = location.pathname !== "/"; // Simple vérification, à remplacer par un vrai système d'auth

  return (
    <div className="navbar">
      <span className="navbar-text">A toi</span>
      {isAuthenticated ? (
        <Link to="/profile" className="navbar-text navbar-link">
          [pseudo]
        </Link>
      ) : (
        <span className="navbar-text">[pseudo]</span>
      )}
    </div>
  );
};

export default NavBar;
