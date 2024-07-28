// Pages/ThemePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormHeader from '../components/FormHeader';
import ThemeSelector from '../components/ThemeSelector';
import ThemePreview from '../components/ThemePreview';
import useAuthenticatedApi from '../utils/useAuthenticatedApi';
import API_ENDPOINTS from '../config/api';
import '../styles/ThemePage.css';

function ThemePage() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { authenticatedFetch } = useAuthenticatedApi();
  const [formData, setFormData] = useState({
    title: '',
    background: 'Light' // Use 'background' instead of 'theme'
  });

  useEffect(() => {
    fetchFormData();
  }, [formId]);

  const fetchFormData = async () => {
    try {
      const data = await authenticatedFetch(API_ENDPOINTS.apiFormsById(formId));
      setFormData(data);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const handleThemeChange = async (newTheme) => {
    try {
      const updatedFormData = { ...formData, background: newTheme };
      await authenticatedFetch(API_ENDPOINTS.apiFormsById(formId), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });
      setFormData(updatedFormData);
      console.log('Theme updated:', newTheme);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  };

  const handleSave = () => {
    navigate(`/flow/${formId}`);
  };

  return (
    <div className="theme-page">
      <FormHeader 
        formName={formData.title}
        onSave={handleSave}
        onFormNameChange={() => {}}
      />
      <div className="theme-content">
        <ThemeSelector 
          selectedTheme={formData.background} 
          setSelectedTheme={(newTheme) => handleThemeChange(newTheme)}
        />
        <ThemePreview theme={formData.background} />
      </div>
    </div>
  );
}

export default ThemePage;