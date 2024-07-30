import React from 'react';
import './ResponseSummary.css';

function ResponseSummary({ submissions }) {
  const totalSubmissions = submissions.length;
  const completedSubmissions = submissions.filter(sub => sub.responses.length > 0).length;
  const completionRate = totalSubmissions > 0 ? (completedSubmissions / totalSubmissions * 100).toFixed(2) : 0;

  return (
    <div className="response-summary">
      <div className="summary-item">
        <h2>Views</h2>
        <p>{totalSubmissions}</p>
      </div>
      <div className="summary-item">
        <h2>Starts</h2>
        <p>{completedSubmissions}</p>
      </div>
      <div className="summary-item">
        <h2>Completion rate</h2>
        <p>{completionRate}%</p>
      </div>
    </div>
  );
}

export default ResponseSummary;