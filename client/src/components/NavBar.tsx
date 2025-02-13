import type React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link
        to="/home"
        className={`navbar-text ${location.pathname === "/home" ? "selected" : ""}`}
      >
        À toi
      </Link>

      <Link
        to="/profile"
        className={`navbar-text ${location.pathname === "/profile" ? "selected" : ""}`}
      >
        Profil
      </Link>
    </nav>
  );
};

export default NavBar;
