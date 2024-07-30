import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import API_ENDPOINTS from '../config/api';
import { useAuth } from '../context/AuthContext'; 
import '../styles/UserProfile.css';
import MainNav from '../components/MainNav/MainNav';
import { FaUser, FaEnvelope, FaMoon, FaSun, FaBriefcase } from 'react-icons/fa';

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  const { isLoggedIn } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!isLoggedIn) {
        setRedirect(true);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(API_ENDPOINTS.apiUserInfoGet, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setRedirect(true);
      }
    };

    fetchUserInfo();
  }, [isLoggedIn]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (loading) return <div className="UserProfile__loading">Loading...</div>;
  if (!userInfo) return <Navigate to="/" />;

  return (
    <div className={`UserProfile__page ${darkMode ? 'UserProfile__darkMode' : ''}`}>
      <MainNav />
      <div className="UserProfile__container">
        <div className="UserProfile__header">
          <div className="UserProfile__avatar">
            {getInitials(userInfo.name)}
          </div>
          <h2 className="UserProfile__name">{userInfo.name}</h2>
          <button className="UserProfile__themeToggle" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
        <div className="UserProfile__info">
          <div className="UserProfile__infoItem">
            <FaUser />
            <p>{userInfo.name}</p>
          </div>
          <div className="UserProfile__infoItem">
            <FaEnvelope />
            <p>{userInfo.email}</p>
          </div>
        </div>
        <Link to="/workspace" className="UserProfile__workspaceBtn">
          <FaBriefcase />
          Go to Your Workspace
        </Link>
      </div>
    </div>
  );
}