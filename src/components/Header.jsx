// components/Header.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userName, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/');   
  };

  const handleSettings = () => {
    navigate('/profile');   
  };

  return (
    <header className="dashboard-header">
      <div className="workspace-dropdown" onClick={toggleDropdown}>
        <span>{userName}'s workspace</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
        {isOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleSettings}>Settings</div>
            <div className="dropdown-item logout" onClick={handleLogout}>Log Out</div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;