import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import ActionBar from '../components/ActionBar/ActionBar';
import CardGrid from '../components/CardGrid/CardGrid';
import CreateFolderModal from '../components/Modal/CreateFolderModal';
import DeleteConfirmationModal from '../components/Modal/DeleteConfirmationModal';
import API_ENDPOINTS from '../config/api';
import { useAuth } from '../context/AuthContext';
import useAuthenticatedApi from '../utils/useAuthenticatedApi';
import '../styles/Dashboard.css';

const Dashboard = () => { 
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const { authenticatedFetch } = useAuthenticatedApi();

  useEffect(() => {
    if (isLoggedIn) {
      fetchFolders();
    }
  }, [isLoggedIn]);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth', { state: { from: location }, replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  if (!isLoggedIn) {
    return null; 
  } 
  const fetchFolders = async () => {
    setIsLoading(true);
    try {
      const data = await authenticatedFetch(API_ENDPOINTS.apiFoldersGet);
      setFolders(data);
      if (data.length > 0 && !selectedFolderId) {
        setSelectedFolderId(data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
      toast.error('Failed to fetch folders. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const createFolder = async (folderName) => {
    setIsLoading(true);
    try {
      await authenticatedFetch(API_ENDPOINTS.apiFoldersPost, {
        method: 'POST',
        body: JSON.stringify({ name: folderName }),
      });
      await fetchFolders();
      setShowCreateModal(false);
      toast.success('Folder created successfully!');
    } catch (error) {
      console.error('Error creating folder:', error);
      toast.error('Failed to create folder. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFolder = async () => {
    if (selectedFolderId) {
      setIsLoading(true);
      try {
        await authenticatedFetch(API_ENDPOINTS.apiFoldersDelete(selectedFolderId), {
          method: 'DELETE',
        });
        await fetchFolders();
        setShowDeleteModal(false);
        toast.success('Folder deleted successfully!');
        if (folders.length > 0) {
          setSelectedFolderId(folders[0]._id);
        } else {
          setSelectedFolderId(null);
        }
      } catch (error) {
        console.error('Error deleting folder:', error);
        toast.error('Failed to delete folder. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const deleteForm = async (formId) => {
    setIsLoading(true);
    try {
      // await authenticatedFetch(API_ENDPOINTS.apiFormsDelete/(formId), {
      //   method: 'DELETE',
      // });
      await authenticatedFetch(API_ENDPOINTS.apiFormsDelete(formId), {
        method: 'DELETE',
      });


      toast.success('Form deleted successfully!');
    } catch (error) {
      console.error('Error deleting form:', error);
      toast.error('Failed to delete form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFolderSelect = (folderId) => {
    setSelectedFolderId(folderId);
  };

  return (
    <div className="dashboard">
      <Header />
      <main className="dashboard-main">
        <ActionBar
          folders={folders}
          selectedFolderId={selectedFolderId}
          onCreateFolder={() => setShowCreateModal(true)}
          onDeleteFolder={(id) => {
            setSelectedFolderId(id);
            setShowDeleteModal(true);
          }}
          onSelectFolder={handleFolderSelect}
        />
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <CardGrid 
            selectedFolderId={selectedFolderId} 
            onDeleteForm={deleteForm}
          />
        )}
      </main>
      {showCreateModal && (
        <CreateFolderModal
          onClose={() => setShowCreateModal(false)}
          onCreateFolder={createFolder}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={deleteFolder}
          onCancel={() => setShowDeleteModal(false)}
          message="Are you sure you want to delete this folder?"
        />
      )}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default Dashboard;