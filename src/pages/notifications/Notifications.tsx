import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Notifications.css';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import { Notification } from './types';
const localizer = momentLocalizer(moment);

const App: React.FC = () => {
    const [events, setEvents] = useState([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await axios.get<Notification[]>('localhost:8080/notifications');
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="notifications-page">
                <h2 className="notations_title">Notifications</h2>
                {notifications.map((notification, index) => (
                    <div className="notification-item" key={index}>
                        <div className="notification-dot"></div>
                        <div className="notification-content">
                            <h3>{notification.title}</h3>
                            <p>{notification.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default App;