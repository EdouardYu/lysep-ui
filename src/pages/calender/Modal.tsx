import React from 'react';
import './Modal.css';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    event: CalendarEvent | null;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, event }) => {
    if (!show || !event) {
        return null;
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{event.title}</h2>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Date:</strong> {new Date(event.start).toLocaleString()}</p>
                <p><strong>Module:</strong> {event.module?.label}</p>
                <p><strong>Publisher:</strong> {event.publisher?.fullname}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;