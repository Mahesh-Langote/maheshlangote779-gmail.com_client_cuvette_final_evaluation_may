// components/ThemePreview.js
import React from 'react';
import './ThemePreview.css';

function ThemePreview({ theme }) {
  const getThemeColor = () => {
    switch (theme) {
      case 'Light': return '#FFFFFF';
      case 'Dark': return '#1E1E1E';
      case 'Tail Blue': return '#5F9EA0';
      default: return '#FFFFFF';
    }
  };

  return (
    <div className="theme-preview-container" style={{ backgroundColor: getThemeColor() }}>
      <div className="preview-content">
        <div className="preview-message assistant">
          <div className="avatar"></div>
          <div className="message-bubble">Hello</div>
        </div>
        <div className="preview-message human">
          <div className="message-bubble">Hi</div>
        </div>
      </div>
    </div>
  );
}

export default ThemePreview;