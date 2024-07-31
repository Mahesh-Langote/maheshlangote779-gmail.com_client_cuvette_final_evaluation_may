// Pages/FormBuilder.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import FormHeader from '../components/FormHeader/FormHeader';
import Sidebar from '../components/SideBarCanvas/Sidebar';
import Canvas from '../components/Canvas/Canvas';
import '../styles/formBuilder.css';
import useAuthenticatedApi from '../utils/useAuthenticatedApi';
import API_ENDPOINTS from '../config/api';

function FormBuilder() {
  const { formId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { authenticatedFetch } = useAuthenticatedApi();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fields: [],
    background: 'Dark',
    folder: new URLSearchParams(location.search).get('folderId') || ''
  });

  useEffect(() => {
    if (formId) {
      fetchFormData();
    }
  }, [formId]);

  const fetchFormData = async () => {
    try {
      const data = await authenticatedFetch(API_ENDPOINTS.apiFormsById(formId));
      setFormData({
        ...data,
        fields: data.fields.map((field) => ({
          ...field,
          id: field._id,
        })),
        theme: data.theme || 'Dark'
      });
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  const addElement = (elementType) => {
    const newField = {
      type: elementType,
      id: Date.now(),
      label: `New ${elementType}`,
      required: false,
      errorMessage: `Please enter a valid ${elementType.toLowerCase()}`,
    };

    switch (elementType) {
      case 'Text':
      case 'Number':
      case 'Email':
      case 'Phone':
      case 'Date':
         
        break;
      case 'Radio':
      case 'Checkbox':
      case 'Dropdown':
        newField.options = ['Option 1'];
        break;
      case 'StarRating':
        newField.starCount = 5;
        break;
      case 'WordRating':
        newField.options = ['Poor', 'Fair', 'Good', 'Excellent'];
        break;
      case 'Image':
      case 'Video':
      case 'GIF':
        newField.url = '';
        break;
      default:
        break;
    }

    setFormData(prevData => ({
      ...prevData,
      fields: [...prevData.fields, newField]
    }));
  };

  const saveForm = async () => {
    try {
      const dataToSend = {
        ...formData,
        fields: formData.fields.map(({ id, ...field }) => field) // Remove client-side id
      };
      if (formId) {
        await authenticatedFetch(API_ENDPOINTS.apiFormsById(formId), {
          method: 'PUT',
          body: JSON.stringify(dataToSend),
        });
      } else {
        await authenticatedFetch(API_ENDPOINTS.apiForms, {
          method: 'POST',
          body: JSON.stringify(dataToSend),
        });
      }
      navigate('/workspace');
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  const handleFormDataChange = (field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  
    return (
      <div className="form-builder">
         <FormHeader 
        formName={formData.title}
        onSave={saveForm}
        onFormNameChange={(value) => handleFormDataChange('title', value)}
        authenticatedFetch={authenticatedFetch}
      />
        <div className="main-content">
          <Sidebar addElement={addElement} />
          <Canvas 
            elements={formData.fields} 
            setFormData={setFormData}
            description={formData.description}
            onDescriptionChange={(value) => handleFormDataChange('description', value)}
          />
        </div>
      </div>
    );
  }
export default FormBuilder;
