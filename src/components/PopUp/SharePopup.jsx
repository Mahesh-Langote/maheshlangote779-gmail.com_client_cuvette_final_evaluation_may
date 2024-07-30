// components/SharePopup.js
import React, { useState } from 'react';
import './sharePopup.css';

function SharePopup({ formId, shareLink, onClose }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="share-popup-overlay">
      <div className="share-popup">
        <h3>Share Form</h3>
        <input type="text" value={shareLink} readOnly />
        <button onClick={copyToClipboard}>
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SharePopup;