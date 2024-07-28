import React, { useState } from 'react';
import FormHeader from '../components/FormHeader';
import ThemeSelector from '../components/ThemeSelector';
import ThemePreview from '../components/ThemePreview';
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