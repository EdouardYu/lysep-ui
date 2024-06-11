import React, { useState } from 'react';
import './Profile.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from "@/components/layout/sidebar/Sidebar";
import { Profile } from './types';


const App: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);

    return (
        <>
            <Sidebar />
            <div className="profile-page">
                <h1>Mon profil</h1>
                <div className="profile-content">
                    <div className="profile-details">
                        <div className="profile-row">
                            <strong>Nom :</strong>
                            <span>{profile.lastname} {profile.firstname}</span>
                        </div>
                        <div className="profile-row">
                            <strong>Email :</strong>
                            <span>{profile.email}</span>
                        </div>
                        <div className="profile-row">
                            <strong>Mot de passe :</strong>
                            <span>********</span>
                        </div>
                        <div className="profile-row">
                            <strong>N° de téléphone :</strong>
                            <span>{profile.phone}</span>
                        </div>
                        <div className="profile-row">
                            <strong>Statut :</strong>
                            <span>{profile.role === 'STUDENT' ? 'Étudiant(e)' : 'Professeur(e)'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
