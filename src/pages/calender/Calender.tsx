import React, { useEffect, useState } from 'react';
import '@/components/layout/sidebar/Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calender.css';
import axiosInstance from "@/services/axiosConfig.ts";

const localizer = momentLocalizer(moment);

interface Event {
    id: number;
    title: string;
    date: string;
    module: {
        id: number;
        label: string;
    };
}

interface CalendarEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
}

const App: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get<Event[]>('/events');
                const transformedEvents = response.data.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: new Date(event.date),
                    end: new Date(event.date) // Assuming the event is a single point in time; adjust as needed
                }));
                setEvents(transformedEvents);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
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