import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './Pages/LoginForm';
import SignupForm from './Pages/SignupForm';
import BackButton from './components/BackButton';
import Shapes from './components/Shapes';
import Dashboard from './Pages/Dashboard';
import FormBuilder from './Pages/FormBuilder';
import ThemePage from './Pages/ThemePage';
import ResponsePage from './Pages/ResponsePage';
import './styles/main.css';
import { setupAxiosInterceptors } from './utils/axiosConfig';
import Home from './Pages';
import UserProfile from './Pages/UserProfile';
import ChatBot from './Pages/chatBot/chatBot';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  setupAxiosInterceptors();

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/serverison`);
        console.log('Server is awake:', response.data);
      } catch (error) {
        console.error('Error waking up server:', error);
      }
    };

    wakeUpServer();
  }, []);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          
          <Route path="/auth" element={
            <div className="container">
              <BackButton />
              <Shapes />
              <div className="auth-form-container">
                {isLogin ? <LoginForm onToggle={toggleForm} /> : <SignupForm onToggle={toggleForm} />}
              </div>
            </div>
          } />
          <Route path="/workspace" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/flow" element={<FormBuilder />} />
          <Route path="/flow/:formId" element={<FormBuilder />} />
          <Route path='/theme' element={<ThemePage />} />
          <Route path="/theme/:formId" element={<ThemePage />} />
          <Route path='/response' element={<ResponsePage />} />
          <Route path="/response/:formId" element={<ResponsePage />} />
          <Route path='/chat' element={<ChatBot />} />
          {/* <Route path="/api/forms/public/:formId" element={<ChatBot />} /> */}
          <Route path="/chat/:formId" element={<ChatBot />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}