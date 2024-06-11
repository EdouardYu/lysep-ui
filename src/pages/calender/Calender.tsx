import React, { useState } from 'react';
import '@/components/layout/sidebar/Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const App: React.FC = () => {
    const [events, setEvents] = useState([]);

    const notifications = [
        {
            title: "Évènement ajouté",
            description: "Sébastien BORTENLANGER a créé l'évènement “Soutenances projet” le mercredi 12 juin.",
            date: "12 juin"
        },
        {
            title: "Évènement ajouté",
            description: "Édith CHAN a créé l'évènement “Réunion profs” le jeudi 13 juin.",
            date: "13 juin"
        },
        {
            title: "Évènement ajouté",
            description: "Ibler VILLEGAS a créé l'évènement “Soutenances projet” le vendredi 7 juin.",
            date: "7 juin"
        }
    ];


    return (
        <>
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
            <div className="calendar">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 800, margin: "50px" }}
                />
            </div>
        </>
    );
};

export default App;