import { useState } from "react";
import "../styles/Modal.css";

interface AddRecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, email: string) => void;
}

const AddRecipientModal: React.FC<AddRecipientModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(name, email);
    setName("");
    setEmail("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Nouveau destinataire</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom du destinataire"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adresse@email.com"
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Annuler
            </button>
            <button type="submit" className="confirm-btn">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipientModal; 