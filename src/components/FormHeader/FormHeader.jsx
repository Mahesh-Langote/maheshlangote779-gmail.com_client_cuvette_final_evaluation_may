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
        navigate('/workspace');
    }
  };

  return (
    <header className="dashboard-headerr">
      <input
        type="text"
        placeholder="Enter Form Name"
        className="dashboard-header__form-name-input"
        value={formName}
        onChange={(e) => onFormNameChange(e.target.value)}
      />
      <nav className="dashboard-header__nav">
        <button
          className={`dashboard-header__tab ${location.pathname.includes('/flow') ? 'active' : ''}`}
          onClick={() => handleTabClick('Flow')}
        >
          Flow
          <span className="dashboard-header__tab-indicator"></span>
        </button>
        <button
          className={`dashboard-header__tab ${location.pathname.includes('/theme') ? 'active' : ''}`}
          onClick={() => handleTabClick('Theme')}
        >
          Theme
          <span className="dashboard-header__tab-indicator"></span>
        </button>
        <button
          className={`dashboard-header__tab ${location.pathname.includes('/response') ? 'active' : ''}`}
          onClick={() => handleTabClick('Response')}
        >
          Response
          <span className="dashboard-header__tab-indicator"></span>
        </button>
      </nav>
      <div className="dashboard-header__actions">
        <button className="dashboard-header__action-button dashboard-header__action-button--share" onClick={handleShare}>
          <span className="dashboard-header__action-icon">🔗</span>
          Share
        </button>
        <button className="dashboard-header__action-button dashboard-header__action-button--save" onClick={onSave}>
          <span className="dashboard-header__action-icon">💾</span>
          Save
        </button>
        <button className="dashboard-header__action-button dashboard-header__action-button--close" onClick={() => navigate('/workspace')}>✕</button>
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