import React, { useState } from 'react';
import FormHeader from './FormHeader';
import ThemeSelector from './ThemeSelector';
import ThemePreview from './ThemePreview';
import '../styles/ThemePage.css';

function ThemePage() {
  const [selectedTheme, setSelectedTheme] = useState('Light');

  return (
    <div className="theme-page">
      <FormHeader />
      <div className="theme-content">
        <ThemeSelector selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} />
        <ThemePreview theme={selectedTheme} />
      </div>
    </div>
  );
}

export default ThemePage;