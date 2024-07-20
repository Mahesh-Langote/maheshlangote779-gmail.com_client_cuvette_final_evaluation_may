// components/DeleteConfirmationModal.js
import React from 'react';
import '../styles/Modal.css';

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Are you sure you want to delete this folder?</h2>
        <div className="modal-actions">
          <button onClick={onConfirm} className="btn-primary">Confirm</button>
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;