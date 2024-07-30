// components/ActionBar.jsx
import React, { useEffect, useState } from 'react';
import './ActionBar.css';

const ActionBar = ({ folders, onCreateFolder, onDeleteFolder, onSelectFolder }) => {
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  useEffect(() => {
    if (folders.length > 0 && !selectedFolderId) {
      setSelectedFolderId(folders[0]._id);
      onSelectFolder(folders[0]._id);
    }
  }, [folders, selectedFolderId, onSelectFolder]);

  const handleFolderClick = (folderId) => {
    setSelectedFolderId(folderId);
    onSelectFolder(folderId);
  };

  return (
    <div className="action-bar">
      <button className="create-folder-btn" onClick={onCreateFolder}>
        <span className="folder-icon">📁</span>
        Create a folder
      </button>
      {folders.map((folder) => (
        <button 
          key={folder._id} 
          className={`network-btn ${selectedFolderId === folder._id ? 'selected' : ''}`}
          onClick={() => handleFolderClick(folder._id)}
        >
          {folder.name}
          <span 
            className="delete-icon" 
            onClick={(e) => {
              e.stopPropagation();
              console.log('Deleting folder with ID:', folder._id);
              onDeleteFolder(folder._id);
            }}
          >
            🗑
          </span>
        </button>
      ))}
    </div>
  );
};

export default ActionBar;