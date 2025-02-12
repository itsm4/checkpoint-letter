import type React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import bgClouds from "../assets/images/bg-clouds.jpg";
import cloudComplete from "../assets/images/cloud-complete.png";
import futureCloud from "../assets/images/cloud-futur.png";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  // Récupérer les infos de l'utilisateur du localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${bgClouds})` }}
    >
      <div className="letter-content">
        <h1 className="main-title">A travers le temps je t'écrirais</h1>

        <div className="letter-section">
          <Link to="/letter/future" className="link-text">
            <h2 className="recipient-title">À toi mon futur</h2>
            <img src={futureCloud} alt="" className="cloud-image" />
          </Link>
        </div>

        <div className="letter-section">
          <Link to="/letter/custom" className="link-text">
            <h2 className="recipient-prompt">À toi</h2>
            <img src={cloudComplete} alt="" className="cloud-image" />
          </Link>
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default Home;
