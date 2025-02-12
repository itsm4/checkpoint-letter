import type React from "react";
import { useState } from "react";
import "../styles/AuthModal.css";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "login" | "signup";
}

interface FormData {
  pseudo?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, type }) => {
  const [formData, setFormData] = useState<FormData>({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const validateForm = () => {
    if (type === "signup") {
      if (!formData.pseudo?.trim()) {
        setError("Le pseudo est requis");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Les mots de passe ne correspondent pas");
        return false;
      }
    }
    if (!formData.email.trim()) {
      setError("L'email est requis");
      return false;
    }
    if (!formData.password) {
      setError("Le mot de passe est requis");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const baseUrl = "http://localhost:3000";
      const endpoint = type === "login" ? "/auth/login" : "/auth/register";

      const requestData =
        type === "login"
          ? {
              email: formData.email,
              password: formData.password,
            }
          : {
              username: formData.pseudo,
              email: formData.email,
              password: formData.password,
            };

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(
          data.message ||
            (type === "login"
              ? "Email ou mot de passe incorrect"
              : "Erreur lors de l'inscription"),
        );
      }

      // Stockage des informations d'authentification
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuthenticated", "true");
      }
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      // Redirection vers la page d'accueil
      onClose();
      window.location.href = "/home";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    }
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
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          {type === "signup" && (
            <input
              type="text"
              name="pseudo"
              placeholder="Pseudo"
              className="auth-input"
              value={formData.pseudo}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="auth-input"
            value={formData.password}
            onChange={handleChange}
          />
          {type === "signup" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              className="auth-input"
              value={formData.confirmPassword}
              onChange={handleChange}
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
