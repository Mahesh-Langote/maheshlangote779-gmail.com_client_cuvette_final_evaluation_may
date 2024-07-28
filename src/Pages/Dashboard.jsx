// components/Dashboard.js
import React, { useState } from 'react';
import Header from '../components/Header';
import ActionBar from '../components/ActionBar';
import CardGrid from '../components/CardGrid';
import CreateFolderModal from '../components/CreateFolderModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
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