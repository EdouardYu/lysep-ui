import React, { useState, useEffect } from 'react';
import axiosInstance from "@/services/axiosConfig.ts";
import './Modal.css';
import { CalendarEvent } from '@/pages/calender/types';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    event: CalendarEvent | null;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, event }) => {
    const [canEdit, setCanEdit] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedEvent, setEditedEvent] = useState({ description: '', date: '' });
    const [showNotification, setShowNotification] = useState<boolean>(false);

    useEffect(() => {
        console.log(event);
        const fetchPermission = async () => {
            if (event && event.id) {
                try {
                    const response = await axiosInstance.get<{ permission: boolean }>(`/events/${event.id}/permission`);
                    setCanEdit(response.data);
                } catch (error) {
                    console.error('Failed to fetch permission', error);
                }
            }
        };

        fetchPermission();
    }, [event]);

    if (!show || !event) {
        return null;
    }

    const handleEditClick = () => {
        setEditedEvent({ description: event.description || '', date: event.start.toISOString() });
        setIsEditing(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveClick = async () => {
        const formattedEvent = {
            ...editedEvent,
            date: new Date(editedEvent.date).toISOString()
        };
        try {
            await axiosInstance.put(`/events/${event.id}`, formattedEvent);
            setIsEditing(false);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                onClose();
            }, 3000); // Hide notification after 3 seconds
        } catch (error) {
            console.error('Failed to update event', error);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {isEditing ? (
                    <>
                        <h2>Edit Event</h2>
                        <div className="modal-row">
                            <label>Description:</label>
                            <input
                                type="text"
                                name="description"
                                value={editedEvent.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="modal-row">
                            <label>Date:</label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={new Date(editedEvent.date).toISOString().slice(0, -1)}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="modal-button modal-button-save" onClick={handleSaveClick}>Save</button>
                        <button className="modal-button modal-button-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h2>{event.title}</h2>
                        <p><strong>Description:</strong> {event.description}</p>
                        <p><strong>Date:</strong> {new Date(event.start).toLocaleString()}</p>
                        <p><strong>Module:</strong> {event.module?.label}</p>
                        <p><strong>Publisher:</strong> {event.publisher?.fullname}</p>
                        <button className="modal-button modal-button-cancel" onClick={onClose}>Close</button>
                        {canEdit && <button className="modal-button modal-button-save" onClick={handleEditClick}>Edit</button>}
                    </>
                )}
                {showNotification && (
                    <div className="notification">
                        Event updated successfully!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
