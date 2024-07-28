import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

  function Navbar() {
  const { isLoggedIn, userName, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-text">FormBot</Link>
      </div>
      <div className="nav-buttons">
        {isLoggedIn ? (
          <>
            <span className="user-greeting">Hello, {userName}!</span>
            <Link to="/profile" className="avatar">
              {userName ? userName[0].toUpperCase() : 'U'}
            </Link>
            <LogoutButton onLogout={logout} />
          </>
        ) : (
          <>
            <Link to="/auth" className="sign-in-btn">Sign in</Link>
            <button className="create-formbot-btn">Create a FormBot</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;