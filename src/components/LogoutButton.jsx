import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LogoutButton.css';

export default function LogoutButton({ onLogout, className }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
    if (onLogout) {
      onLogout();
    }
    setShowModal(false);
  };

  const handleCancelLogout = () => {
    setShowModal(false);
  };

  return (
    <>
      <button onClick={handleLogoutClick} className={`LogOut__button ${className}`}>
        Logout
      </button>
      {showModal && (
        <div className="LogOut__modalOverlay">
          <div className="LogOut__modalContent">
            <h2 className="LogOut__modalTitle">Confirm Logout</h2>
            <p className="LogOut__modalText">Are you sure you want to log out?</p>
            <div className="LogOut__modalActions">
              <button onClick={handleCancelLogout} className="LogOut__modalButton LogOut__modalButtonSecondary">
                Cancel
              </button>
              <button onClick={handleConfirmLogout} className="LogOut__modalButton LogOut__modalButtonPrimary">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}