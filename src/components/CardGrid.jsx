// components/CardGrid.js
import React, { useState, useEffect } from 'react';
import '../styles/CardGrid.css';
import useAuthenticatedApi from '../utils/useAuthenticatedApi';
import API_ENDPOINTS from '../config/api';

const CardGrid = ({ selectedFolderId }) => {
  const [forms, setForms] = useState([]);
  const { authenticatedFetch } = useAuthenticatedApi();

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

  return (
    <div className="card-grid">
      <div className="card create-typebot">
        <span className="plus-icon">+</span>
        <p>Create a typebot</p>
      </div>
      {forms.map((form, index) => (
        <div key={form._id || `form-${index}`} className="card new-form">
          <p>{form.title || 'Untitled Form'}</p>
          <span className="delete-icon">🗑</span>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;