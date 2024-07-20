
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import BackButton from './components/BackButton';
import Shapes from './components/Shapes';
import Dashboard from './components/Dashboard.jsx';
import './styles/main.css';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <BackButton />
            <Shapes />
            <div className="auth-form-container">
              {isLogin ? <LoginForm onToggle={toggleForm} /> : <SignupForm onToggle={toggleForm} />}
            </div>
          </div>
        } />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}