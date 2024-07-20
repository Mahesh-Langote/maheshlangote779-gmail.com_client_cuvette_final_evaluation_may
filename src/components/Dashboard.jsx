// components/Dashboard.js
import React, { useState } from 'react';
import Header from './Header';
import ActionBar from './ActionBar';
import CardGrid from './CardGrid';
import CreateFolderModal from './CreateFolderModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="dashboard">
       <Header />
      <main className="dashboard-main">
      
      <ActionBar 
  onCreateFolder={() => setShowCreateModal(true)} 
  onDeleteFolder={() => setShowDeleteModal(true)}
/>
         <CardGrid  />
      </main>
      {showCreateModal && (
        <CreateFolderModal onClose={() => setShowCreateModal(false)} />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal 
          onConfirm={() => {
            
            setShowDeleteModal(false);
          }}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;