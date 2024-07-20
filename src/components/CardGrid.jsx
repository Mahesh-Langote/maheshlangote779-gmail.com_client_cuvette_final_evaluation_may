// components/CardGrid.js
import React from 'react';
import '../styles/CardGrid.css';

const CardGrid = () => {
  return (
    <div className="card-grid">
      <div className="card create-typebot">
        <span className="plus-icon">+</span>
        <p>Create a typebot</p>
      </div>
      {[1, 2].map((_, i) => (
        <div key={i} className="card new-form">
          <p>New form</p>
          <span className="delete-icon">🗑</span>
        </div>
      ))}
    </div>
  );
};

export default CardGrid;