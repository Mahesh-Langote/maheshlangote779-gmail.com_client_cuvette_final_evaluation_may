import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FormHeader.css';
import SharePopup from '../PopUp/SharePopup';
import API_ENDPOINTS from '../../config/api';

function FormHeader({ formName, onSave, onFormNameChange, authenticatedFetch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const formId = location.pathname.split('/').pop();

  const handleShare = async () => {
    try {
      const response = await authenticatedFetch(API_ENDPOINTS.apiFormsShare(formId), {
        method: 'POST',
      });
      const data = await response;
      console.log(data.shareableLink)
      setShareLink(data.shareableLink);
      setShowSharePopup(true);
    } catch (error) {
      console.error('Error generating share link:', error);
    }
  };
  const handleTabClick = (tab) => {
    switch(tab) {
      case 'Flow':
        navigate(`/flow/${formId}`);
        break;
      case 'Theme':
        navigate(`/theme/${formId}`);
        break;
      case 'Response':
        navigate(`/response/${formId}`);
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
          className={`header-tab ${location.pathname.includes('/theme') ? 'active' : ''}`}
          onClick={() => handleTabClick('Theme')}
        >
          Theme
        </button>
        <button
  className={`header-tab ${location.pathname.includes('/response') ? 'active' : ''}`}
  onClick={() => handleTabClick('Response')}
>
  Response
</button>
      </div>
      <div className="header-actions">
      <button className="action-button" onClick={handleShare}>Share</button>
      <button className="action-button save" onClick={onSave}>Save</button>
      <button className="action-button close" onClick={() => navigate('/')}>✕</button>
    </div>
    {showSharePopup && (
      <SharePopup
        formId={formId}
        shareLink={shareLink}
        onClose={() => setShowSharePopup(false)}
      />
    )}
  </header>
  );
}

export default FormHeader;