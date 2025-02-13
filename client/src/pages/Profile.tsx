import type React from "react";
import NavBar from "../components/NavBar";
import "../styles/Profile.css";

interface Letter {
  id: string;
  title: string;
  date: string;
  preview: string;
}

const Profile: React.FC = () => {
  const sentLetters: Letter[] = [
    {
      id: "1",
      title: "À mon futur",
      date: "12 Jan 2024",
      preview: "Le temps passe si vite...",
    },
    {
      id: "2",
      title: "À Sophie",
      date: "27 Sep 2023",
      preview: "Je voulais te dire...",
    },
  ];

  const draftLetters: Letter[] = [
    {
      id: "3",
      title: "Brouillon",
      date: "15 Jan 2024",
      preview: "En cours d'écriture...",
    },
  ];

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
              <p className="letter-date">{letter.date}</p>
              <p className="letter-preview">{letter.preview}</p>
              <div className="letter-actions">
                <button type="button">Récupérer</button>
                <button type="button">Modifier</button>
                <button type="button">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="drafts-section">
        <h2>Mes lettres à envoyer</h2>
        <div className="letters-grid">
          {draftLetters.map((letter) => (
            <div key={letter.id} className="letter-card draft">
              <h3>{letter.title}</h3>
              <p className="letter-date">{letter.date}</p>
              <p className="letter-preview">{letter.preview}</p>
              <div className="letter-actions">
                <button type="button">Continuer</button>
                <button type="button">Supprimer</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <NavBar />
    </div>
  );
};

export default Profile;
