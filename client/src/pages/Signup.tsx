import type React from "react";
import "../styles/LoginSignup.css";

const Signup: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1 className="auth-title">Inscription</h1>
        <form className="auth-form">
          <input type="text" placeholder="Pseudo" className="auth-input" />
          <input type="email" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Mot de passe" className="auth-input" />
          <input type="password" placeholder="Confirmer le mot de passe" className="auth-input" />
          <button type="submit" className="auth-button">S'inscrire</button>
        </form>
      </div>
    </div>
  );
};

export default Signup; 