import type React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "signup";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Ajouter la logique d'authentification ici

    onClose();
    navigate("/home");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button type="button" className="modal-close" onClick={onClose}>
          ×
        </button>
        <h1 className="auth-title">
          {type === "login" ? "Connexion" : "Inscription"}
        </h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          {type === "signup" && (
            <input type="text" placeholder="Pseudo" className="auth-input" />
          )}
          <input type="email" placeholder="Email" className="auth-input" />
          <input
            type="password"
            placeholder="Mot de passe"
            className="auth-input"
          />
          {type === "signup" && (
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="auth-input"
            />
          )}
          <button type="submit" className="auth-button">
            {type === "login" ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
