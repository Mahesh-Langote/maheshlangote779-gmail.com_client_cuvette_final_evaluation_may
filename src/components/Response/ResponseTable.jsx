import React from 'react';
import './ResponseTable.css';

function ResponseTable({ submissions }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getResponseValue = (responses, fieldName) => {
    const response = responses.find(r => r.field === fieldName);
    return response ? response.value : '';
  };

  const allFields = [...new Set(submissions.flatMap(sub => sub.responses.map(r => r.field)))];

  return (
    <div className="response-table-container">
      <table className="response-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Submitted at</th>
            <th>Unique ID</th>
            {allFields.map(field => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission) => (
            <tr key={submission._id}>
              <td>{submission._id}</td>
              <td>{formatDate(submission.createdAt)}</td>
              <td>{submission.uniqueId}</td>
              {allFields.map(field => (
                <td key={field}>{getResponseValue(submission.responses, field)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResponseTable;