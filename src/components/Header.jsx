// components/Header.js
import React, { useState } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <header className="dashboard-header">
      <div className="workspace-dropdown" onClick={toggleDropdown}>
        <span>Dewank Rastogi's workspace</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item logout">Log Out</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;