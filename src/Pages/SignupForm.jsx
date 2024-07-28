import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API_ENDPOINTS from '../config/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupForm({ onToggle }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.length < 3 ? 'Username must be at least 3 characters long' : '';
      case 'email':
        return !/\S+@\S+\.\S+/.test(value) ? 'Email address is invalid' : '';
      case 'password':
        return value.length < 6 ? 'Password must be at least 6 characters long' : '';
      case 'confirmPassword':
        return value !== formData.password ? 'Passwords do not match' : '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  useEffect(() => {
    setErrors({ ...errors, confirmPassword: validateField('confirmPassword', formData.confirmPassword) });
  }, [formData.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const formErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key, formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const response = await axios.post(
        API_ENDPOINTS.apiAuthRegisterPost,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      console.log('Signup successful:', response.data);

      login(response.data.token, formData.name);

      toast.success('Signup successful! Redirecting...', {
        onClose: () => {
          navigate('/');
        }
      });
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'An error occurred during signup');
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="name"
          placeholder="Enter a username"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          required
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          required
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'error' : ''}
          required
        />
        {errors.password && <p className="error-message">{errors.password}</p>}

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.confirmPassword ? 'error' : ''}
          required
        />
        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}

        <button type="submit" className="submit-btn">Sign Up</button>
        <p>Already have an account? <a href="#" onClick={onToggle}>Login</a></p>
      </form>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} />
    </>
  );
}