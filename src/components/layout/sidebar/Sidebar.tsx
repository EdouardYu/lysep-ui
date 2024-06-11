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
                <img src="/public/assets/bust_in_silhouette.png" alt="profile" className="menuIcon" />
                <span className="menuText">Mon profil</span>
            </div>
            <div className="menuItem">
                <img src="/public/assets/spiral_calendar_pad.png" alt="calendar" className="menuIcon" />
                <span className="menuText">Calendrier</span>
            </div>
            <div className="menuItem">
                <img src="/public/assets/bell.png" alt="notifications" className="menuIcon" />
                <span className="menuText">Notifications</span>
            </div>
            <div className="menuItem">
                <img src="/public/assets/rotating_light.png" alt="alerts" className="menuIcon" />
                <span className="menuText">Alertes</span>
            </div>
            <div className="menuItem">
                <img src="/public/assets/ballot_box_with_check.png" alt="tasks" className="menuIcon" />
                <span className="menuText">Tâches</span>
            </div>
            <div className="menuItem">
                <img src="/public/assets/gear.png" alt="settings" className="menuIcon" />
                <span className="menuText">Paramètres</span>
            </div>
        </div>
    );
};

export default Sidebar;
