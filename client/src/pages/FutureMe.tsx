import { useState } from "react";
import "../styles/FutureMe.css";
import { FiFilter, FiPlus, FiSave, FiSend, FiX } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import ReadLetterModal from "../components/ReadLetterModal";
import SendConfirmationModal from "../components/SendConfirmationModal";
import { useLetters } from "../hooks/useLetters";

interface FutureLetter {
  id: string;
  title: string;
  content: string;
  writeDate: string;
  deliveryDate: string;
  preview: string;
  status: "draft" | "scheduled";
}

const FutureMe: React.FC = () => {
  const location = useLocation();
  const editingLetter = location.state?.editingLetter;

  const [selectedLetter, setSelectedLetter] = useState<FutureLetter | null>(
    null,
  );
  const [isWriting, setIsWriting] = useState(!!editingLetter);
  const { letters, drafts, sentLetters, saveDraft, sendLetter, deleteLetter } =
    useLetters();
  const [title, setTitle] = useState(editingLetter?.title || "");
  const [content, setContent] = useState(editingLetter?.content || "");
  const [deliveryDate, setDeliveryDate] = useState(
    editingLetter?.deliveryDate?.split("T")[0] || "",
  );
  const [letterToRead, setLetterToRead] = useState<FutureLetter | null>(null);
  const [showSendModal, setShowSendModal] = useState(false);
  const [draftsSortOrder, setDraftsSortOrder] = useState<"asc" | "desc">(
    "desc",
  );
  const [sentSortOrder, setSentSortOrder] = useState<"asc" | "desc">("desc");

  const handleNewLetter = () => {
    setIsWriting(true);
    setSelectedLetter(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSendModal(true);
  };

  const handleSaveDraft = () => {
    saveDraft({
      id: selectedLetter?.id,
      title,
      content,
      deliveryDate,
      status: "draft",
    });
    setIsWriting(false);
  };

  const handleConfirmSend = async (email: string) => {
    // Créer la lettre avec le bon format
    const sentLetter = {
      id: selectedLetter?.id || Date.now().toString(),
      title,
      content,
      deliveryDate,
      writeDate: new Date().toISOString(),
      email,
      status: "scheduled" as const, // Force le type à "scheduled"
    };

    // Si c'était un brouillon, on le supprime d'abord
    if (selectedLetter?.id) {
      deleteLetter(selectedLetter.id);
    }

    // Puis on ajoute la lettre aux messages envoyés
    sendLetter(sentLetter);

    setShowSendModal(false);
    resetForm();
  };

  const resetForm = () => {
    setIsWriting(false);
    setTitle("");
    setContent("");
    setDeliveryDate("");
  };

  const toggleDraftsSort = () => {
    setDraftsSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const toggleSentSort = () => {
    setSentSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortLetters = (letters: FutureLetter[], order: "asc" | "desc") => {
    return [...letters].sort((a, b) => {
      const dateA = new Date(a.writeDate).getTime();
      const dateB = new Date(b.writeDate).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
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

        <div className="letters-section">
          <div className="section-header">
            <h2>Brouillons</h2>
            <button
              className="filter-btn"
              onClick={toggleDraftsSort}
              title={draftsSortOrder === "asc" ? "Plus récent" : "Plus ancien"}
            >
              <FiFilter />
            </button>
          </div>
          {sortLetters(drafts, draftsSortOrder).map((letter) => (
            <div
              key={letter.id}
              className="letter-item"
              onClick={() => {
                setIsWriting(true);
                setTitle(letter.title);
                setContent(letter.content);
                setDeliveryDate(letter.deliveryDate.split("T")[0]);
                setSelectedLetter(letter);
              }}
            >
              <h3>{letter.title}</h3>
              <p>
                Enregistré le: {new Date(letter.writeDate).toLocaleDateString()}
              </p>
              <p className="letter-preview">
                {letter.content.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>

        <div className="letters-section">
          <div className="section-header">
            <h2>Messages envoyés</h2>
            <button
              className="filter-btn"
              onClick={toggleSentSort}
              title={sentSortOrder === "asc" ? "Plus récent" : "Plus ancien"}
            >
              <FiFilter />
            </button>
          </div>
          {sortLetters(sentLetters, sentSortOrder).map((letter) => (
            <div
              key={letter.id}
              className="letter-item"
              onClick={() => setLetterToRead(letter)}
            >
              <h3>{letter.title}</h3>
              <p>
                À ouvrir le:{" "}
                {new Date(letter.deliveryDate).toLocaleDateString()}
              </p>
              <p className="letter-preview">
                {letter.content.substring(0, 100)}...
              </p>
            </div>
          ))}
        </div>
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

      <ReadLetterModal
        isOpen={letterToRead !== null}
        onClose={() => setLetterToRead(null)}
        letter={letterToRead!}
      />

      <SendConfirmationModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        onConfirm={handleConfirmSend}
      />

      <div
        className={`nav-container ${showSendModal || letterToRead ? "hidden" : ""}`}
      >
        <NavBar />
      </div>
    </div>
  );
};

export default FutureMe;
