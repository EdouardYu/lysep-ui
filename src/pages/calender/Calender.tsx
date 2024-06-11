import React, { useEffect, useState } from 'react';
import '@/components/layout/sidebar/Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calender.css';
import axiosInstance from "@/services/axiosConfig.ts";
import Modal from './Modal';
import {CalendarEvent} from "@/pages/calender/types.ts";

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

const App: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get<Event[]>('/events');
                const transformedEvents = response.data.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: new Date(event.date),
                    end: new Date(event.date), // Assuming the event is a single point in time; adjust as needed
                    description: event.description,
                    module: event.module,
                    publisher: event.publisher,
                    created_at: event.created_at
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

    const handleEventClick = async (event: CalendarEvent) => {
        try {
            const response = await axiosInstance.get<Event>(`/events/${event.id}`);
            const fetchedEvent = {
                ...response.data,
                id: event.id,
                start: new Date(response.data.date),
                end: new Date(response.data.date), // Assuming single point in time
            };
            setSelectedEvent(fetchedEvent);
            setModalOpen(true);
        } catch (err) {
            setError('Failed to fetch event details');
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedEvent(null);
    };

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
                    onSelectEvent={handleEventClick}
                />
            </div>
            <Modal show={modalOpen} onClose={closeModal} event={selectedEvent} />
        </>
    );
};

export default App;