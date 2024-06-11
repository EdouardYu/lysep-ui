import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '@/services/axiosConfig';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/signout');
            localStorage.removeItem('authToken');
            navigate('/login');
        } catch (error) {
            console.error('Failed to sign out', error);
        }
    };

    return (
        <div className="sidebar">
            <div className="header">
                <h2>Hey dear user!</h2>
            </div>
            <Link to="/profile" className="menuItem">
                <img src="/public/assets/bust_in_silhouette.png" alt="profile" className="menuIcon" />
                <span className="menuText">Mon profil</span>
            </Link>
            <Link to="/calender" className="menuItem">
                <img src="/public/assets/spiral_calendar_pad.png" alt="calendar" className="menuIcon" />
                <span className="menuText">Calendrier</span>
            </Link>
            <Link to="/notifications" className="menuItem">
                <img src="/public/assets/bell.png" alt="notifications" className="menuIcon" />
                <span className="menuText">Notifications</span>
            </Link>
            <Link to="/alerts" className="menuItem">
                <img src="/public/assets/rotating_light.png" alt="alerts" className="menuIcon" />
                <span className="menuText">Alertes</span>
            </Link>
            <Link to="/tasks" className="menuItem">
                <img src="/public/assets/ballot_box_with_check.png" alt="tasks" className="menuIcon" />
                <span className="menuText">Tâches</span>
            </Link>
            <Link to="/settings" className="menuItem">
                <img src="/public/assets/gear.png" alt="settings" className="menuIcon" />
                <span className="menuText">Paramètres</span>
            </Link>
            <span className="menuItem" onClick={handleLogout}>
                <img src="/public/assets/logout.png" alt="logout" className="menuIcon" />
                <span className="menuText">Déconnexion</span>
            </span>
        </div>
    );
};

export default Sidebar;