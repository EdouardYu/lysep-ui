// Sidebar.tsx
import React from 'react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="header">
                <h2>Hey, Zakia!</h2>
            </div>
            <div className="menuItem">
                <img src="/public/icons/profil.png" alt="profile" className="menuIcon" />
                <span className="menuText">Mon profil</span>
            </div>
            <div className="menuItem">
                <img src="/public/icons/calender.png" alt="calendar" className="menuIcon" />
                <span className="menuText">Calendrier</span>
            </div>
            <div className="menuItem">
                <img src="/public/icons/cloche.png" alt="notifications" className="menuIcon" />
                <span className="menuText">Notifications</span>
            </div>
            <div className="menuItem">
                <img src="/public/icons/alert.png" alt="alerts" className="menuIcon" />
                <span className="menuText">Alertes</span>
            </div>
            <div className="menuItem">
                <img src="/public/icons/task.png" alt="tasks" className="menuIcon" />
                <span className="menuText">Tâches</span>
            </div>
            <div className="menuItem">
                <img src="/public/icons/settings.png" alt="settings" className="menuIcon" />
                <span className="menuText">Paramètres</span>
            </div>
        </div>
    );
};

export default Sidebar;
