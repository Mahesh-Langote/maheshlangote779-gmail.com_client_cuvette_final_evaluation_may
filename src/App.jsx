import { useState } from 'react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import BackButton from './components/BackButton';
import Shapes from './components/Shapes';
import './styles/main.css';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="container">
      <BackButton />
      
      <Shapes />
      <div className="auth-form-container">
        {isLogin ? <LoginForm onToggle={toggleForm} /> : <SignupForm onToggle={toggleForm} />}
      </div>
    </div>
  );
}