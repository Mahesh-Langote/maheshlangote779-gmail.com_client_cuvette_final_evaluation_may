// components/DeleteConfirmationModal.js
import React from 'react';
import './Modal.css';

const DeleteConfirmationModal = ({ onConfirm, onCancel, message }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{message}</h2>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn-primary">Confirm</button>
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;