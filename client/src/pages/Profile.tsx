import type React from "react";
import NavBar from "../components/NavBar";
import "../styles/Profile.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/DeleteConfirmation";
import ReadLetterModal from "../components/ReadLetterModal";
import { useLetters } from "../hooks/useLetters";
import { FiEye, FiEdit2, FiDownload, FiTrash2, FiSend } from "react-icons/fi";

interface Letter {
  id: string;
  title: string;
  date: string;
  preview: string;
}

const Profile: React.FC = () => {
  const { sentLetters, drafts, deleteLetter, updateLetter } = useLetters();
  const navigate = useNavigate();
  const [letterToDelete, setLetterToDelete] = useState<string | null>(null);
  const [letterToRead, setLetterToRead] = useState<Letter | null>(null);

  const handleRead = (letter: Letter) => {
    setLetterToRead(letter);
  };

  const handleEdit = (letter: Letter) => {
    navigate('/future-me', { 
      state: { 
        editingLetter: {
          id: letter.id,
          title: letter.title,
          content: letter.content,
          deliveryDate: letter.deliveryDate
        }
      }
    });
  };

  const handleDownload = (letter: Letter) => {
    // Créer un fichier texte à télécharger
    const content = `${letter.title}\n\nÉcrit le: ${new Date(letter.writeDate).toLocaleDateString()}\nÀ ouvrir le: ${new Date(letter.deliveryDate).toLocaleDateString()}\n\n${letter.content}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${letter.title}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDeleteClick = (letterId: string) => {
    setLetterToDelete(letterId);
  };

  const handleConfirmDelete = () => {
    if (letterToDelete) {
      deleteLetter(letterToDelete);
      setLetterToDelete(null);
    }
  };

  // Mise à jour de l'effet pour gérer les deux modales
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
      // Cacher la navbar si l'une des modales est ouverte
      navbar.style.display = (letterToRead || letterToDelete) ? "none" : "flex";
    }
    
    return () => {
      if (navbar) {
        navbar.style.display = "flex";
      }
    };
  }, [letterToRead, letterToDelete]); // Dépendance aux deux états

  return (
    <div className="profile-container">
      <button type="button" className="logout-button">
        Déconnexion
      </button>

      <section className="recipients-section">
        <h2>Mes destinataires</h2>
        <div className="recipients-list">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="recipient-circle">
              <span className="recipient-initial">D{i}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="letters-section">
        <h2>Mes lettres envoyées</h2>
        <div className="letters-grid">
          {sentLetters.map((letter) => (
            <div key={letter.id} className="letter-card">
              <h3>{letter.title}</h3>
              <p className="letter-date">
                À ouvrir le:{" "}
                {new Date(letter.deliveryDate).toLocaleDateString()}
              </p>
              <p className="letter-preview">
                {letter.content.substring(0, 100)}...
              </p>
              <div className="letter-actions">
                <button type="button" onClick={() => handleRead(letter)} title="Lire">
                  <FiEye />
                </button>
                <button type="button" onClick={() => handleEdit(letter)} title="Modifier">
                  <FiEdit2 />
                </button>
                <button type="button" onClick={() => handleDownload(letter)} title="Télécharger">
                  <FiDownload />
                </button>
                <button type="button" onClick={() => handleDeleteClick(letter.id)} title="Supprimer">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
          {sentLetters.length === 0 && (
            <p className="empty-state">Aucune lettre envoyée pour le moment</p>
          )}
        </div>
      </section>

      <section className="drafts-section">
        <h2>Mes lettres à envoyer</h2>
        <div className="letters-grid">
          {drafts.map((letter) => (
            <div key={letter.id} className="letter-card draft">
              <h3>{letter.title}</h3>
              <p className="letter-date">
                Dernière modification:{" "}
                {new Date(letter.writeDate).toLocaleDateString()}
              </p>
              <p className="letter-preview">
                {letter.content.substring(0, 100)}...
              </p>
              <div className="letter-actions">
                <button type="button" onClick={() => handleRead(letter)} title="Lire">
                  <FiEye />
                </button>
                <button type="button" onClick={() => handleEdit(letter)} title="Modifier">
                  <FiEdit2 />
                </button>
                <button type="button" onClick={() => handleDownload(letter)} title="Télécharger">
                  <FiDownload />
                </button>
                <button type="button" onClick={() => updateLetter(letter.id, { status: "scheduled" })} title="Envoyer">
                  <FiSend />
                </button>
                <button type="button" onClick={() => handleDeleteClick(letter.id)} title="Supprimer">
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
          {drafts.length === 0 && (
            <p className="empty-state">Aucun brouillon pour le moment</p>
          )}
        </div>
      </section>

      <DeleteConfirmation
        isOpen={letterToDelete !== null}
        onClose={() => setLetterToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      <ReadLetterModal
        isOpen={letterToRead !== null}
        onClose={() => setLetterToRead(null)}
        letter={letterToRead!}
      />

      <NavBar />
    </div>
  );
};

export default Profile;
