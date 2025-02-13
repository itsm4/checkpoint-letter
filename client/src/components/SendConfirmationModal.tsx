import { useState } from "react";
import "../styles/Modal.css";

interface SendConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
}

const SendConfirmationModal: React.FC<SendConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmer l'envoi</h2>
        <p>Entrez votre adresse email pour recevoir votre lettre dans le futur</p>
        
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="email-input"
          required
        />

        <div className="modal-actions">
          <button 
            type="button"
            className="confirm-btn"
            onClick={() => onConfirm(email)}
          >
            Confirmer
          </button>
          <button 
            type="button"
            className="cancel-btn"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendConfirmationModal; 