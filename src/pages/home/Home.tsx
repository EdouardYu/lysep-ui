import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate("signup");
  };

  const handleLogin = () => {
    navigate("login");
  };
  return (
    <div className="homepage-container">
      <div className="homepage-logo">
        <img src="/assets/logo.png" alt="LYS'EP Logo" />{" "}
        {/* Assurez-vous de mettre le bon chemin vers votre logo */}
      </div>
      <div className="homepage-content">
        <h1>Connecte-toi et profite des fonctionnalités de LYS’EP !</h1>
        <div className="homepage-buttons">
          <button onClick={handleLogin} className="homepage-button login">
            Connexion
          </button>
          <button onClick={handleSignup} className="homepage-button register">
            S’inscrire gratuitement
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
