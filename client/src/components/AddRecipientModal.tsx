import { useState } from "react";
import "../styles/Modal.css";

interface AddRecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, relation: string) => void;
}

const AddRecipientModal: React.FC<AddRecipientModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(name, relation);
    setName("");
    setRelation("");
    onClose();
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="relation">Relation</label>
            <input
              type="text"
              id="relation"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
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
