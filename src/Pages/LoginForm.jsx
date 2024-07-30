import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import API_ENDPOINTS from '../config/api';
import { useAuth } from '../context/AuthContext';

export default function LoginForm({ onToggle }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINTS.apiAuthLoginPost, formData);

      if (response.data && response.data.token) {
        try {
          const userInfoResponse = await axios.get(API_ENDPOINTS.apiUserInfoGet, {
            headers: { Authorization: `Bearer ${response.data.token}` }
          });

          login(response.data.token, userInfoResponse.data.name);
          toast.success('Login successful! Redirecting...', {
            onClose: () => {
              const from = location.state?.from?.pathname || '/';
              navigate(from, { replace: true });
            }
          });
        } catch (userInfoError) {
          console.error('Error fetching user info:', userInfoError);
          toast.error('Login successful, but failed to fetch user info');
        }
      } else {
        throw new Error('Login failed: No token received');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'An error occurred during login');
    }
  };
  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input 
          type="email" 
          name="email"
          placeholder="Enter your email" 
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input 
          type="password" 
          name="password"
          placeholder="••••••••" 
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-btn">Log in</button>
        <p>Don't have an account? <a href="#" onClick={onToggle}>Sign up</a></p>
      </form>
      <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />
    </>
  );
}
