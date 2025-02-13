import { useState } from "react";
import "../styles/FutureMe.css";
import NavBar from "../components/NavBar";

interface FutureLetter {
  id: string;
  title: string;
  date: string;
  deliveryDate: string;
  preview: string;
  content?: string;
}

const FutureMe: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<FutureLetter | null>(
    null,
  );
  const [isWriting, setIsWriting] = useState(false);

  const futureLetters: FutureLetter[] = [
    {
      id: "1",
      title: "Moi dans 5 ans",
      date: "Jan 12, 2024",
      deliveryDate: "Jan 12, 2029",
      preview: "Je me demande où je serai dans 5 ans...",
    },
    {
      id: "2",
      title: "Pour mes 30 ans",
      date: "Jan 15, 2024",
      deliveryDate: "Sep 20, 2026",
      preview: "Cher moi du futur, aujourd'hui j'ai décidé...",
    },
  ];

  const handleNewLetter = () => {
    setIsWriting(true);
    setSelectedLetter(null);
  };

  return (
    <div className="future-me-container">
      <div className="letters-list">
        <button
          type="button"
          className="new-letter-btn"
          onClick={handleNewLetter}
        >
          + Nouvelle lettre
        </button>

        {futureLetters.map((letter) => (
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
                Écrite le: {letter.date} • À ouvrir le: {letter.deliveryDate}
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="letter-editor">
        {isWriting ? (
          <div className="writing-area">
            <input
              type="text"
              className="letter-title-input"
              placeholder="Titre de votre lettre"
            />
            <div className="delivery-date">
              <label htmlFor="delivery-date">À ouvrir le:</label>
              <input type="date" id="delivery-date" />
            </div>
            <textarea
              className="letter-content-input"
              placeholder="Cher moi du futur..."
            />
            <div className="editor-actions">
              <button type="button" className="save-btn">
                Envoyer dans le futur
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setIsWriting(false)}
              >
                Annuler
              </button>
            </div>
          </div>
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
