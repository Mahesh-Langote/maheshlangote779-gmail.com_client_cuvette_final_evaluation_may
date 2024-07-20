// components/ActionBar.jsx
import React, { useState } from 'react';
import CreateFolderModal from './CreateFolderModal';
import '../styles/ActionBar.css';

const ActionBar = ({ onCreateFolder, onDeleteFolder  }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="action-bar">
      <button className="create-folder-btn" onClick={() => setShowCreateModal(true)}>
        <span className="folder-icon">📁</span>
        Create a folder
      </button>
      {[1, 2, 3, 4].map((_, i) => (
        <button key={i} className="network-btn">
          Computer Networks
          <span className="delete-icon" onClick={onDeleteFolder}>🗑</span>
        </button>
      ))}
      {showCreateModal && (
        <CreateFolderModal 
          onClose={() => setShowCreateModal(false)} 
          onCreateFolder={onCreateFolder}
        />
      )}
    </div>
  );
};

export default ActionBar;