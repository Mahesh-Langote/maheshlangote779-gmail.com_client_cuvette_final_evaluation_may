import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ResponseSummary from '../components/Response/ResponseSummary';
import ResponseTable from '../components/Response/ResponseTable';
import '../styles/ResponsePage.css';
import FormHeader from '../components/FormHeader/FormHeader';
import API_ENDPOINTS from '../config/api';

function ResponsePage() {
  const [submissions, setSubmissions] = useState([]);
  const [formName, setFormName] = useState('');
  const { formId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [submissionsResponse, formResponse] = await Promise.all([
          axios.get(`${API_ENDPOINTS.apiSubmissions}/form-submissions/${formId}`),
          axios.get(`${API_ENDPOINTS.apiForms}/${formId}`)
        ]);
        setSubmissions(submissionsResponse.data);
        setFormName(formResponse.data.name);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [formId]);

  const handleFormNameChange = (newName) => {
    setFormName(newName);
  };

  const handleSave = async () => {
    try {
      await axios.put(`${API_ENDPOINTS.apiForms}/${formId}`, { name: formName });
    } catch (error) {
      console.error('Error saving form name:', error);
    }
  };

  return (
    <>
      <FormHeader 
        formName={formName} 
        onFormNameChange={handleFormNameChange}
        onSave={handleSave}
      />
      <div className="response-page">
        <div className="response-content">
          <ResponseSummary submissions={submissions} />
          <ResponseTable submissions={submissions} />
        </div>
      </div>
    </>
  );
}

export default ResponsePage;