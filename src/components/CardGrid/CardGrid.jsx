// components/CardGrid.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardGrid.css';
import useAuthenticatedApi from '../../utils/useAuthenticatedApi';
import API_ENDPOINTS from '../../config/api';
import DeleteConfirmationModal from '../Modal/DeleteConfirmationModal';

const CardGrid = ({ selectedFolderId, onDeleteForm }) => {
  const [forms, setForms] = useState([]);
  const [formToDelete, setFormToDelete] = useState(null);
  const { authenticatedFetch } = useAuthenticatedApi();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedFolderId) {
      fetchForms(selectedFolderId);
    }
  }, [selectedFolderId]);

  const fetchForms = async (folderId) => {
    try {
      const data = await authenticatedFetch(`${API_ENDPOINTS.apiFormsFolder}/${folderId}`);
      setForms(data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleDeleteClick = (formId) => {
    console.log('Attempting to delete form with ID:', formId);
    setFormToDelete(formId);
  };

  const handleConfirmDelete = async () => {
    if (formToDelete) {
      console.log('Confirming deletion of form with ID:', formToDelete);
      try {
        await onDeleteForm(formToDelete);
        console.log('Form deleted successfully');
        setFormToDelete(null);
        fetchForms(selectedFolderId);
      } catch (error) {
        console.error('Error deleting form:', error);
      }
    }
  };

  const handleCancelDelete = () => {
    setFormToDelete(null);
  };

  const handleOpenForm = (formId) => {
    navigate(`/flow/${formId}`);
  };

  const handleCreateForm = () => {
    navigate(`/flow?folderId=${selectedFolderId}`);
  };

  return (
    <div className="card-grid">
      <div className="card create-typebot" onClick={handleCreateForm}>
        <span className="plus-icon">+</span>
        <p>Create a typebot</p>
      </div>

      {forms.map((form) => (
        <div key={form.id} className="card new-form" onClick={() => handleOpenForm(form.id)}>
          <p>{form.title || 'Untitled Form'}</p>
          <span 
            className="delete-icon" 
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(form.id);
            }}
          >
            🗑
          </span>
        </div>
      ))}
      {formToDelete && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          message="Are you sure you want to delete this form?"
        />
      )}
    </div>
  );
};

export default CardGrid;