import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/api";
import "../styles/LoginSignup.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = isLogin 
        ? await authService.login(email, password)
        : await authService.register(email, password);

      if (response.token) {
        authService.setToken(response.token);
        navigate("/home");
      } else {
        setError(response.message || "Une erreur est survenue");
      }
    } catch (error) {
      setError("Une erreur est survenue");
      console.error(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1 className="auth-title">{isLogin ? "Connexion" : "Inscription"}</h1>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>
        <button
          className="auth-switch"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Créer un compte" : "Déjà inscrit ?"}
        </button>
      </div>
    </div>
  );
};

export default Login;
