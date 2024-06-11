import React, { useState } from 'react';
import './Modal.css';

interface PasswordModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (oldPassword: string, newPassword: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ show, onClose, onSave }) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showNotification, setShowNotification] = useState<boolean>(false);

    if (!show) {
        return null;
    }

    const handleSave = () => {
        onSave(oldPassword, newPassword);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
            onClose();
        }, 3000); // Hide notification after 3 seconds
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Change Password</h2>
                <div className="modal-row">
                    <label>Current Password:</label>
                    <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="modal-row">
                    <label>New Password:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button className="modal-button modal-button-save" onClick={handleSave}>Save</button>
                <button className="modal-button modal-button-cancel" onClick={onClose}>Cancel</button>
                {showNotification && (
                    <div className="notification">
                        Password changed successfully!
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordModal;