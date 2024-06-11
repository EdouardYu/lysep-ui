import React from 'react';
import './Modal.css';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    event: any; // Replace `any` with a more specific type if necessary
}

const Modal: React.FC<ModalProps> = ({ show, onClose, event }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{event.title}</h2>
                <p><strong>Date:</strong> {new Date(event.start).toLocaleString()}</p>
                <p><strong>Module:</strong> {event.module?.label}</p>
                <button onClick={onClose}>Fermer</button>
            </div>
        </div>
    );
};

export default Modal;