import { useState } from "react";
import "../styles/ForYou.css";
import { FiFilter, FiPlus, FiSave, FiSend, FiX } from "react-icons/fi";
import AddRecipientModal from "../components/AddRecipientModal";
import NavBar from "../components/NavBar";
import ReadLetterModal from "../components/ReadLetterModal";
import SendConfirmationModal from "../components/SendConfirmationModal";
import { useLetters } from "../hooks/useLetters";

interface Letter {
  id: string;
  title: string;
  content: string;
  writeDate: string;
  deliveryDate: string;
  recipient: string;
  preview: string;
  status: "draft" | "scheduled";
  type: "for-you";
}

interface Recipient {
  id: string;
  name: string;
  relation: string;
}

const ForYou: React.FC = () => {
  const { drafts, sentLetters, deleteLetter, sendLetter, saveDraft } =
    useLetters("for-you");
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(
    null,
  );
  const [draftsSortOrder, setDraftsSortOrder] = useState<"asc" | "desc">(
    "desc",
  );
  const [sentSortOrder, setSentSortOrder] = useState<"asc" | "desc">("desc");
  const [showSendModal, setShowSendModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [showAddRecipientModal, setShowAddRecipientModal] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([
    {
      id: "1",
      name: "Sophie",
      relation: "Meilleure amie",
    },
    {
      id: "2",
      name: "Maman",
      relation: "Famille",
    },
  ]);
  const [letterToRead, setLetterToRead] = useState<Letter | null>(null);

  const letters: Letter[] = [
    {
      id: "1",
      title: "Merci pour tout",
      date: "Jan 12, 2024",
      recipient: "Sophie",
      preview: "Je voulais te remercier pour tous ces moments...",
    },
    {
      id: "2",
      title: "Hello",
      date: "Dec 25, 2023",
      recipient: "Maman",
      preview: "Depuis toute petite, tu as toujours été là...",
    },
  ];

  const handleNewLetter = () => {
    setIsWriting(true);
    setSelectedLetter(null);
  };

  const toggleDraftsSort = () => {
    setDraftsSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const toggleSentSort = () => {
    setSentSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const sortLetters = (letters: any[], order: "asc" | "desc") => {
    return [...letters].sort((a, b) => {
      const dateA = new Date(a.writeDate).getTime();
      const dateB = new Date(b.writeDate).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSendModal(true);
  };

  const handleConfirmSend = async (email: string) => {
    const recipient = recipients.find((r) => r.id === recipientId);

    const sentLetter = {
      id: selectedLetter?.id || Date.now().toString(),
      title,
      content,
      writeDate: new Date().toISOString(),
      deliveryDate: new Date().toISOString(),
      email,
      recipient: recipient?.name || "",
      status: "scheduled" as const,
      preview: content.substring(0, 100),
      type: "for-you" as const,
    };

    if (selectedLetter?.id) {
      deleteLetter(selectedLetter.id);
    }

    sendLetter(sentLetter);
    setShowSendModal(false);
    setIsWriting(false);
    resetForm();
  };

  const handleSaveDraft = () => {
    const recipient = recipients.find((r) => r.id === recipientId);

    const draftLetter = {
      id: selectedLetter?.id,
      title,
      content,
      deliveryDate: new Date().toISOString(),
      writeDate: new Date().toISOString(),
      recipient: recipient?.name || "",
      status: "draft" as const,
      preview: content.substring(0, 100),
      type: "for-you" as const,
    };

    if (selectedLetter?.id) {
      deleteLetter(selectedLetter.id);
    }

    saveDraft(draftLetter);

    setIsWriting(false);
    setSelectedLetter(null);
    resetForm();
  };

  const handleEditDraft = (letter: Letter) => {
    setIsWriting(true);
    setTitle(letter.title);
    setContent(letter.content || "");
    const recipient = recipients.find((r) => r.name === letter.recipient);
    if (recipient) {
      setRecipientId(recipient.id);
      setSelectedRecipient(recipient);
    }
    setSelectedLetter(letter);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setRecipientId("");
    setSelectedRecipient(null);
  };

  const handleAddRecipient = (name: string, relation: string) => {
    const newRecipient: Recipient = {
      id: Date.now().toString(),
      name,
      relation,
    };
    setRecipients((prev) => [...prev, newRecipient]);
  };

  return (
    <div className="for-you-container">
      <div className="letters-list">
        <button
          type="button"
          className="new-letter-btn"
          onClick={handleNewLetter}
        >
          <FiPlus /> <span>Nouvelle lettre</span>
        </button>

        <div className="recipients-section">
          <h2>Destinataires</h2>
          <div className="recipients-grid">
            {recipients.map((recipient) => (
              <button
                key={recipient.id}
                type="button"
                className={`recipient-card ${selectedRecipient?.id === recipient.id ? "selected" : ""}`}
                onClick={() => setSelectedRecipient(recipient)}
              >
                <div className="recipient-initial">
                  {recipient.name.charAt(0)}
                </div>
                <div className="recipient-info">
                  <h3>{recipient.name}</h3>
                  <p>{recipient.relation}</p>
                </div>
              </button>
            ))}
            <button
              type="button"
              className="add-recipient-btn"
              onClick={() => setShowAddRecipientModal(true)}
            >
              <FiPlus /> <span>Nouveau destinataire</span>
            </button>
          </div>
        </div>

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
              onClick={() => handleEditDraft(letter)}
            >
              <h3>{letter.title}</h3>
              <p>Pour: {letter.recipient}</p>
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
              <p>Pour: {letter.recipient}</p>
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
            <div className="recipient-selector">
              <label htmlFor="recipient-select">Pour:</label>
              <select
                id="recipient-select"
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                required
              >
                <option value="">Choisir un destinataire</option>
                {recipients.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              className="letter-title-input"
              placeholder="Titre de votre lettre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              className="letter-content-input"
              placeholder="Cher(e)..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div className="editor-actions">
              <button type="submit" className="save-btn" title="Envoyer">
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
                onClick={() => setIsWriting(false)}
                title="Annuler"
              >
                <FiX />
              </button>
            </div>
          </form>
        ) : selectedLetter ? (
          <div className="letter-content">
            <h2>{selectedLetter.title}</h2>
            <div className="letter-metadata">
              Pour: {selectedLetter.recipient}
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

      <SendConfirmationModal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        onConfirm={handleConfirmSend}
      />

      <AddRecipientModal
        isOpen={showAddRecipientModal}
        onClose={() => setShowAddRecipientModal(false)}
        onConfirm={handleAddRecipient}
      />

      <ReadLetterModal
        isOpen={letterToRead !== null}
        onClose={() => setLetterToRead(null)}
        letter={letterToRead!}
      />

      <div
        className={`nav-container ${showSendModal || letterToRead ? "hidden" : ""}`}
      >
        <NavBar />
      </div>
    </div>
  );
};

export default ForYou;
