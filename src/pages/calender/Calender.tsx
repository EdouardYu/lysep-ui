import React, { useEffect, useState } from 'react';
import '@/components/layout/sidebar/Sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calender.css';
import axiosInstance from "@/services/axiosConfig.ts";
import Modal from './Modal';
import { CalendarEvent } from "@/pages/calender/types.ts";

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

interface Module {
    id: number;
    label: string;
}

const App: React.FC = () => {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [createEventModalOpen, setCreateEventModalOpen] = useState<boolean>(false);
    const [modules, setModules] = useState<Module[]>([]);
    const [newEvent, setNewEvent] = useState({
        title: '',
        description: '',
        date: '',
        module: '',
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axiosInstance.get<Event[]>('/events');
                const transformedEvents = response.data.map(event => ({
                    id: event.id,
                    title: event.title,
                    start: new Date(event.date),
                    end: new Date(event.date), // Assuming the event is a single point in time; adjust as needed
                }));
                setEvents(transformedEvents);
            } catch (err) {
                setError('Failed to fetch events');
            } finally {
                setLoading(false);
            }
        };

        const fetchModules = async () => {
            try {
                const response = await axiosInstance.get<Module[]>('/modules');
                setModules(response.data);
            } catch (err) {
                setError('Failed to fetch modules');
            }
        };

        fetchEvents();
        fetchModules();
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

    const openCreateEventModal = () => {
        setCreateEventModalOpen(true);
    };

    const closeCreateEventModal = () => {
        setCreateEventModalOpen(false);
        setNewEvent({
            title: '',
            description: '',
            date: '',
            module: '',
        });
    };

    const handleCreateEventChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateEventSubmit = async () => {
        const module = modules.find(mod => mod.label === newEvent.module);
        if (!module) {
            setError('Module not found');
            return;
        }

        const formattedDate = new Date(newEvent.date).toISOString();

        const payload = {
            title: newEvent.title,
            description: newEvent.description,
            date: formattedDate, // Use the formatted date with seconds
            module_id: module.id,
        };


        try {
            await axiosInstance.post('/events', payload);
            closeCreateEventModal();
            // Refresh events after creation
            const response = await axiosInstance.get<Event[]>('/events');
            const transformedEvents = response.data.map(event => ({
                id: event.id,
                title: event.title,
                start: new Date(event.date),
            }));
            setEvents(transformedEvents);
        } catch (err) {
            setError('Failed to create event');
        }
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
            <button onClick={openCreateEventModal}>Create Event</button>
            <Modal show={modalOpen} onClose={closeModal} event={selectedEvent} />
            {createEventModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create Event</h2>
                        <label>
                            Title:
                            <input type="text" name="title" value={newEvent.title} onChange={handleCreateEventChange} />
                        </label>
                        <label>
                            Description:
                            <input type="text" name="description" value={newEvent.description} onChange={handleCreateEventChange} />
                        </label>
                        <label>
                            Date:
                            <input type="datetime-local" name="date" value={newEvent.date} onChange={handleCreateEventChange} />
                        </label>
                        <label>
                            Module:
                            <select name="module" value={newEvent.module} onChange={handleCreateEventChange}>
                                <option value="">Select Module</option>
                                {modules.map(mod => (
                                    <option key={mod.id} value={mod.label}>{mod.label}</option>
                                ))}
                            </select>
                        </label>
                        <button onClick={handleCreateEventSubmit}>Submit</button>
                        <button onClick={closeCreateEventModal}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default App;
