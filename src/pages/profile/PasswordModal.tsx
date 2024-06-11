// PasswordModal.tsx
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

    if (!show) {
        return null;
    }

    const handleSave = () => {
        onSave(oldPassword, newPassword);
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
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default PasswordModal;
