import React, { useState } from 'react'; 
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../../components/LogoutButton';
import './MainNav.css';
import logo from '../../assets/images/logo.svg';

const MainNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, userName, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="MainNav">
      <div className="MainNav__logo">
      <div><img src={logo} alt="Triangle" /></div> <div><h4>FormBot</h4></div>
      </div>
      <button 
        className={`MainNav__menuButton ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`MainNav__links ${isMenuOpen ? 'MainNav__links--open' : ''}`}>
        <Link to="/" className="MainNav__link" onClick={toggleMenu}>Home</Link>
        
        {isLoggedIn ? (
          <>
            <span className="MainNav__greeting">Hello, {userName}!</span>
            <Link to="/profile" className="MainNav__avatar" onClick={toggleMenu}>
              {userName ? userName[0].toUpperCase() : 'U'}
            </Link>
            <LogoutButton onLogout={logout} />
          </>
        ) : (
          <>
            <Link to="/auth" className="MainNav__link MainNav__link--signin" onClick={toggleMenu}>Sign in</Link>
            <button 
      onClick={() => navigate('/workspace')} 
      className="MainNav__link MainNav__link--create"
    >
      Create a FormBot
    </button> </>
        )}
      </div>
    </nav>
  );
};

export default MainNav;