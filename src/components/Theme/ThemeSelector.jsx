// components/ThemeSelector.js
import React from 'react';
import './ThemeSelector.css';

function ThemeSelector({ selectedTheme, setSelectedTheme }) {
  const themes = [
    { name: 'Light', color: '#FFFFFF' },
    { name: 'Dark', color: '#1E1E1E' },
    { name: 'Tail Blue', color: '#5F9EA0' },
  ];

  return (
    <div className="theme-selector">
      <h2>Customize the theme</h2>
      <div className="theme-options">
        {themes.map((theme) => (
          <div
            key={theme.name}
            className={`theme-option ${selectedTheme === theme.name ? 'selected' : ''}`}
            onClick={() => setSelectedTheme(theme.name)}
          >
            <div className="theme-preview" style={{ backgroundColor: theme.color }}>
              <div className="preview-item blue-circle"></div>
              <div className="preview-item orange-bar"></div>
              <div className="preview-item blue-circle"></div>
              <div className="preview-item blue-squares">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="theme-name">{theme.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;