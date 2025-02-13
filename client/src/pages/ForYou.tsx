import { useState } from "react";
import "../styles/ForYou.css";
import { FiPlus, FiSave, FiSend, FiX } from "react-icons/fi";
import NavBar from "../components/NavBar";

interface Letter {
  id: string;
  title: string;
  date: string;
  recipient: string;
  preview: string;
  content?: string;
}

interface Recipient {
  id: string;
  name: string;
  relation: string;
}

const ForYou: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(
    null,
  );

  const recipients: Recipient[] = [
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
  ];

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
      title: "Je t'aime maman",
      date: "Dec 25, 2023",
      recipient: "Maman",
      preview: "Depuis toute petite, tu as toujours été là...",
    },
  ];

  const handleNewLetter = () => {
    setIsWriting(true);
    setSelectedLetter(null);
  };

  return (
    <div className="for-you-container">
      <div className="letters-list">
        <div className="recipients-section">
          <h2>Destinataires</h2>
          <div className="recipients-grid">
            {recipients.map((recipient) => (
              <button
                key={recipient.id}
                type="button"
                className={`recipient-card ${selectedRecipient?.id === recipient.id ? "selected" : ""}`}
                onClick={() => setSelectedRecipient(recipient)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setSelectedRecipient(recipient)
                }
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
            <button type="button" className="add-recipient-btn">
              <FiPlus /> <span>Nouveau destinataire</span>
            </button>
          </div>
        </div>

        <div className="letters-section">
          <h2>Mes lettres</h2>
          <button
            type="button"
            className="new-letter-btn"
            onClick={handleNewLetter}
          >
            <FiPlus /> <span>Nouvelle lettre</span>
          </button>

          {letters.map((letter) => (
            <button
              key={letter.id}
              type="button"
              className="letter-item"
              onClick={() => setSelectedLetter(letter)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedLetter(letter)}
            >
              <div className="letter-info">
                <h3>{letter.title}</h3>
                <p className="letter-preview">{letter.preview}</p>
                <div className="letter-metadata">
                  Pour: {letter.recipient} • Écrite le: {letter.date}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="letter-editor">
        {isWriting ? (
          <div className="writing-area">
            <div className="recipient-selector">
              <label htmlFor="recipient-select">Pour:</label>
              <select id="recipient-select">
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
            />
            <textarea
              className="letter-content-input"
              placeholder="Cher(e)..."
            />
            <div className="editor-actions">
              <button type="button" className="save-btn" title="Envoyer">
                <FiSend />
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
          </div>
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

      <NavBar />
    </div>
  );
};

export default ForYou;
