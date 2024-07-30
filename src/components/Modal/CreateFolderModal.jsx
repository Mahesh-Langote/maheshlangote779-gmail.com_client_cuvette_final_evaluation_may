// components/CreateFolderModal.jsx
import React, { useState } from 'react';
import './Modal.css';

const CreateFolderModal = ({ onClose, onCreateFolder }) => {
  const [folderName, setFolderName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateFolder(folderName);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Folder</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <div className="modal-actions">
            <button type="submit" className="btn-primary">Done</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;