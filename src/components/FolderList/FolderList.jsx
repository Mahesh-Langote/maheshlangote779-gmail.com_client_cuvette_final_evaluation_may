import React from 'react';
import './FolderList.css';

function FolderList({ folders, onDeleteFolder }) {
  return (
    <div className="folder-list">
      {folders.map(folder => (
        <div key={folder.id} className="folder">
          <span className="folder-name">{folder.name}</span>
          <button className="delete-btn" onClick={() => onDeleteFolder(folder.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default FolderList;