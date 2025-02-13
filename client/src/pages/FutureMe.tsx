import { useState } from "react";
import "../styles/FutureMe.css";
import { FiPlus, FiSave, FiSend, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useLetters } from "../hooks/useLetters";

interface FutureLetter {
  id: string;
  title: string;
  date: string;
  deliveryDate: string;
  preview: string;
  content?: string;
}

const FutureMe: React.FC = () => {
  const location = useLocation();
  const editingLetter = location.state?.editingLetter;

  const [selectedLetter, setSelectedLetter] = useState<FutureLetter | null>(
    null,
  );
  const [isWriting, setIsWriting] = useState(!!editingLetter);
  const { letters, saveDraft, sendLetter } = useLetters();
  const [title, setTitle] = useState(editingLetter?.title || "");
  const [content, setContent] = useState(editingLetter?.content || "");
  const [deliveryDate, setDeliveryDate] = useState(
    editingLetter?.deliveryDate?.split("T")[0] || "",
  );

  const handleNewLetter = () => {
    setIsWriting(true);
    setSelectedLetter(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendLetter({
      title,
      content,
      deliveryDate,
      status: "scheduled",
    });
    resetForm();
  };

  const handleSaveDraft = () => {
    saveDraft({
      title,
      content,
      deliveryDate,
      status: "draft",
    });
    resetForm();
  };

  const resetForm = () => {
    setIsWriting(false);
    setTitle("");
    setContent("");
    setDeliveryDate("");
  };

  return (
    <div className="future-me-container">
      <div className="letters-list">
        <button
          type="button"
          className="new-letter-btn"
          onClick={handleNewLetter}
        >
          <FiPlus /> <span>Nouvelle lettre</span>
        </button>

        {letters.map((letter) => (
          <div key={letter.id} className="letter-item">
            <h3>{letter.title}</h3>
            <p>
              À ouvrir le: {new Date(letter.deliveryDate).toLocaleDateString()}
            </p>
            <p className="letter-preview">
              {letter.content.substring(0, 100)}...
            </p>
          </div>
        ))}
      </div>

      <div className="letter-editor">
        {isWriting ? (
          <form onSubmit={handleSubmit} className="writing-area">
            <input
              type="text"
              className="letter-title-input"
              placeholder="Titre de votre lettre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div className="delivery-date">
              <label htmlFor="delivery-date">À ouvrir le:</label>
              <input
                type="date"
                id="delivery-date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
              />
            </div>
            <textarea
              className="letter-content-input"
              placeholder="Cher moi du futur..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="editor-actions">
              <button
                type="submit"
                className="save-btn"
                title="Envoyer dans le futur"
              >
                <FiSend />
              </button>
              <button
                type="button"
                className="draft-btn"
                title="Sauvegarder"
                onClick={handleSaveDraft}
              >
                <FiSave />
              </button>
              <button
                type="button"
                className="cancel-btn"
                title="Annuler"
                onClick={() => setIsWriting(false)}
              >
                <FiX />
              </button>
            </div>
          </form>
        ) : selectedLetter ? (
          <div className="letter-content">
            <h2>{selectedLetter.title}</h2>
            <div className="letter-metadata">
              À ouvrir le: {selectedLetter.deliveryDate}
            </div>
            <p className="letter-text">
              {selectedLetter.content || selectedLetter.preview}
            </p>
          </div>
        ) : (
          <div className="empty-state">
            <p>Sélectionnez une lettre ou écrivez-en une nouvelle</p>
          </div>
        )}
      </div>

      <NavBar />
    </div>
  );
};

export default FutureMe;
