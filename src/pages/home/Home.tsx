import React from 'react';
import './Home.css';
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="homepage-container">
            <div className="homepage-logo">
                <img src="/public/assets/logo.png" alt="LYS'EP Logo" /> {/* Assurez-vous de mettre le bon chemin vers votre logo */}
            </div>
            <div className="homepage-content">
                <h1>Connecte-toi et profite des fonctionnalités de LYS’EP !</h1>
                <div className="homepage-buttons">
                    <Link to="/authenfication/login"><button className="homepage-button login">Connexion</button></Link>
                    <button className="homepage-button register">S’inscrire gratuitement</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
