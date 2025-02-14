import type React from "react";
import "../styles/LoginSignup.css";

const Login: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1 className="auth-title">Connexion</h1>
        <form className="auth-form">
          <input type="email" placeholder="Email" className="auth-input" />
          <input
            type="password"
            placeholder="Mot de passe"
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
