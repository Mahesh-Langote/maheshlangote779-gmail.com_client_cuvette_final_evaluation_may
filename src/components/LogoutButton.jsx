import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <button onClick={handleLogout} className="logout-btn">Logout</button>
  );
}