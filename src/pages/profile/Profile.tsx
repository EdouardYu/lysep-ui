import React, {useEffect, useState} from 'react';
import './Profile.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Profile } from './types';
import axiosInstance from "@/services/axiosConfig.ts";

const App: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            // const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
            const userId = "1";

            if (!userId) {
                setError('User ID not found');
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get<Profile>(`/profile/${userId}`);
                setProfile(resp.data);onse
            } catch (err) {
                setError('Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!profile) {
        return <div>No profile data</div>;
    }

    return (
        <>
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
