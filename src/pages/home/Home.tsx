import React from 'react';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="homepage-container">
            <div className="homepage-logo">
                <img src="/public/icons/logo.png" alt="LYS'EP Logo" /> {/* Assurez-vous de mettre le bon chemin vers votre logo */}
            </div>
            <div className="homepage-content">
                <h1>Connecte-toi et profite des fonctionnalités de LYS’EP !</h1>
                <div className="homepage-buttons">
                    <button className="homepage-button login">Connexion</button>
                    <button className="homepage-button register">S’inscrire gratuitement</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
