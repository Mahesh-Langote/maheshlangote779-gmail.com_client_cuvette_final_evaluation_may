
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import BackButton from './components/BackButton';
import Shapes from './components/Shapes';
import Dashboard from './components/Dashboard.jsx';
import FormBuilder from './components/FormBuilder.jsx';
import './styles/main.css';
import ThemeSelector from './components/ThemeSelector.jsx';
import ThemePage from './components/ThemePage.jsx';
import ResponsePage from './components/ResponsePage.jsx';
// import FormHeader from './components/FromHeader.jsx';

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
        <Route path="/flow" element={<FormBuilder />} />
        <Route path='/theme' element={<ThemePage />} />
        <Route path='/response' element={<ResponsePage />} />
        
      </Routes>
    </Router>
  );
}