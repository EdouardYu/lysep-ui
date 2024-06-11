import React, { useEffect, useState } from 'react';
import './Profile.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Profile } from './types';
import axiosInstance from "@/services/axiosConfig.ts";

const App: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedProfile, setEditedProfile] = useState({ username: '', phone: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("authToken");
            const payload = JSON.parse(atob(token!.split(".")[1]));
            const userId = payload.id;

            if (!userId) {
                setError('User ID not found');
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get<Profile>(`/profiles/${userId}`);
                setProfile(response.data);
                setEditedProfile({ username: response.data.username, phone: response.data.phone });
            } catch (err) {
                setError('Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        if (profile) {
            try {
                const response = await axiosInstance.put<Profile>(`/profiles/${profile.id}`, editedProfile);
                setProfile(response.data);
                setIsEditing(false);
            } catch (err) {
                setError('Failed to update profile');
            }
        }
    };

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
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedProfile.phone}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <span>{profile.phone}</span>
                            )}
                        </div>
                        <div className="profile-row">
                            <strong>Statut :</strong>
                            <span>{profile.role === 'STUDENT' ? 'Étudiant(e)' : 'Professeur(e)'}</span>
                        </div>
                        {isEditing ? (
                            <div className="profile-row">
                                <strong>Nom d'utilisateur :</strong>
                                <input
                                    type="text"
                                    name="username"
                                    value={editedProfile.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                        ) : (
                            <div className="profile-row">
                                <strong>Nom d'utilisateur :</strong>
                                <span>{profile.username}</span>
                            </div>
                        )}
                    </div>
                    {isEditing ? (
                        <button onClick={handleSaveClick}>Save</button>
                    ) : (
                        <button onClick={handleEditClick}>Edit</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default App;
