import type React from "react";
import { useState } from "react";
import "../styles/ScreenHome.css";
import bgClouds from "../assets/images/bg-clouds.jpg";
import cloudComplete from "../assets/images/cloud-complete.png";
import futureCloud from "../assets/images/cloud-futur.png";
import AuthModal from "../components/AuthModal";

const ScreenHome: React.FC = () => {
  const [modalType, setModalType] = useState<"login" | "signup" | null>(null);

  return (
    <>
      <div
        className="home-container"
        style={{ backgroundImage: `url(${bgClouds})` }}
      >
        <div className="letter-content">
          <h1 className="main-title">À travers le temps je t'écrirais</h1>

          <div className="letter-section">
            <button
              type="button"
              className="link-text"
              onClick={() => setModalType("login")}
            >
              <h2 className="recipient-title">Connexion</h2>
              <img src={futureCloud} alt="" className="cloud-image" />
            </button>
          </div>

          <div className="letter-section">
            <button
              type="button"
              className="link-text"
              onClick={() => setModalType("signup")}
            >
              <h2 className="recipient-prompt">S'inscrire</h2>
              <img src={cloudComplete} alt="" className="cloud-image" />
            </button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        type={modalType || "login"}
      />
    </>
  );
};

export default ScreenHome;
