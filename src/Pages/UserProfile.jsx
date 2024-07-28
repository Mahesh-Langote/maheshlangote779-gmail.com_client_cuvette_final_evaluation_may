import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import API_ENDPOINTS from '../config/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import '../styles/UserProfile.css';

export default function UserProfile() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!isLoggedIn) {
        setError('User is not logged in');
        setLoading(false);
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
        setError('Failed to fetch user information');
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [isLoggedIn]);

  if (loading) return <div className="user-profile loading">Loading...</div>;
  if (error) return <div className="user-profile error">{error}</div>;
  if (!userInfo) return <div className="user-profile error">No user information available</div>;

  return (
    <div className="profile-page">
      <Navbar />
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>
        <Link to="/edit-profile" className="edit-profile-btn">Edit Profile</Link>
      </div>
    </div>
  );
}