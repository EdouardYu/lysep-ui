import React, { useState, useEffect } from 'react';
import './Notifications.css';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Notification } from './types';
import axiosInstance from "@/services/axiosConfig.ts";
const localizer = momentLocalizer(moment);

const Notifications: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axiosInstance.get<Notification[]>('/notifications');
                setNotifications(response.data);
            } catch (err) {
                setError('Failed to fetch notifications');
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="notifications-page">
                <h2 className="notifications-title">Notifications</h2>
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div className="notification-item" key={index}>
                            <div className="notification-dot"></div>
                            <div className="notification-content">
                                <h3>{notification.title}</h3>
                                <p>{notification.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No notifications available</p>
                )}
            </div>
        </>
    );
};

export default Notifications;