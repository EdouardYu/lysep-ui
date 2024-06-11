import React, { useState, useEffect } from 'react';
import './Alerts.css';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {Alert} from './types';
import axiosInstance from "@/services/axiosConfig.ts";
const localizer = momentLocalizer(moment);

const Alerts: React.FC = () => {
    const [notifications, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const response = await axiosInstance.get<Alert[]>('/alerts');
                setAlerts(response.data);
            } catch (err) {
                setError('Failed to fetch alerts');
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
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
                    <p>No alerts available</p>
                )}
            </div>
        </>
    );
};

export default Alerts;