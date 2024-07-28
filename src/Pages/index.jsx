import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Home.css';

export default function Home() {
  return (
    <div className="home-container">
      <Navbar />
      
      <main className="main-content">
        <section className="hero">
          <h1 className="main-heading">Build advanced chatbots visually</h1>
          <p className="sub-heading">Create, customize, and deploy chatbots without coding</p>
          <button className="cta-button" onClick={() => window.location.href = '/dashboard'}>
  Create a FormBot for free
</button>  </section>
        
        <section className="cta-section">
          <h2>Ready to get started?</h2>
          <p>Create your first chatbot today and revolutionize your customer interactions</p>
          <button className="cta-button">Start Building Now</button>
        </section>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 FormBot. All rights reserved.</p>
          <nav className="footer-nav">
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}