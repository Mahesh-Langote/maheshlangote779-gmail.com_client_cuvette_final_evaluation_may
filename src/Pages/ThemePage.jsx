// Pages/ThemePage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import FormHeader from '../components/FormHeader/FormHeader';
import ThemeSelector from '../components/Theme/ThemeSelector';
import ThemePreview from '../components/Theme/ThemePreview';
import useAuthenticatedApi from '../utils/useAuthenticatedApi';
import API_ENDPOINTS from '../config/api';
import '../styles/ThemePage.css';

function ThemePage() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { authenticatedFetch } = useAuthenticatedApi();
  const [formData, setFormData] = useState({
    title: '',
    background: 'Dark'
  });
  const [isNewForm, setIsNewForm] = useState(false);

  useEffect(() => {
    if (formId === 'new' || location.pathname.includes('/new')) {
      setIsNewForm(true);
    } else {
      fetchFormData();
    }
  }, [formId, location]);

  const fetchFormData = async () => {
    try {
      const data = await authenticatedFetch(API_ENDPOINTS.apiFormsById(formId));
      setFormData(data);
    } catch (error) {
      console.error('Error fetching form data:', error);
      // If there's an error, we'll just use the default state
    }
  };

  const handleThemeChange = async (newTheme) => {
    if (isNewForm) {
      setFormData(prevData => ({ ...prevData, background: newTheme }));
    } else {
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
    }
  };

  const handleSave = async () => {
    if (isNewForm) {
      try {
        const response = await authenticatedFetch(API_ENDPOINTS.apiForms, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const newForm = await response.json();
        navigate(`/flow/${newForm._id}`);
      } catch (error) {
        console.error('Error creating new form:', error);
      }
    } else {
      navigate(`/flow/${formId}`);
    }
  };

  const handleFormNameChange = (newName) => {
    setFormData(prevData => ({ ...prevData, title: newName }));
  };

  return (
    <div className="theme-page">
      <FormHeader 
        formName={formData.title}
        onSave={handleSave}
        onFormNameChange={handleFormNameChange}
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