// components/FormHeader.js
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/FormHeader.css';

function FormHeader({ formName, onSave, onFormNameChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab) => {
    switch(tab) {
      case 'Flow':
        navigate('/flow');
        break;
      case 'Theme':
        navigate('/theme');
        break;
      case 'Response':
        navigate('/response');
        break;
      default:
        navigate('/dashboard');
    }
  };

  return (
    <header className="form-header">
      <input 
        type="text" 
        placeholder="Enter Form Name" 
        className="form-name-input" 
        value={formName} 
        onChange={(e) => onFormNameChange(e.target.value)}
      />
      <div className="header-tabs">
        <button 
          className={`header-tab ${location.pathname.includes('/flow') ? 'active' : ''}`} 
          onClick={() => handleTabClick('Flow')}
        >
          Flow
        </button>
        <button 
          className={`header-tab ${location.pathname === '/theme' ? 'active' : ''}`} 
          onClick={() => handleTabClick('Theme')}
        >
          Theme
        </button>
        <button 
          className={`header-tab ${location.pathname === '/response' ? 'active' : ''}`} 
          onClick={() => handleTabClick('Response')}
        >
          Response
        </button>
      </div>
      <div className="header-actions">
        <button className="action-button">Share</button>
        <button className="action-button save" onClick={onSave}>Save</button>
        <button className="action-button close" onClick={() => navigate('/dashboard')}>✕</button>
      </div>
    </header>
  );
}

export default FormHeader;