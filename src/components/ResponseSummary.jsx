import React from 'react';
import '../styles/ResponseSummary.css';

function ResponseSummary() {
  return (
    <div className="response-summary">
      <div className="summary-item">
        <h2>Views</h2>
        <p>6</p>
      </div>
      <div className="summary-item">
        <h2>Starts</h2>
        <p>3</p>
      </div>
      <div className="summary-item">
        <h2>Completion rate</h2>
        <p>33%</p>
      </div>
    </div>
  );
}

export default ResponseSummary;