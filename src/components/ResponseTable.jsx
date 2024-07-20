import React from 'react';
import '../styles/ResponseTable.css';

function ResponseTable() {
  const responses = [
    { id: 1, submittedAt: 'Jul 17, 03:23 PM', button1: 'Hi!', email1: 'abc@g.com', text1: 'alpha', button2: 'Studio App to Manage Clients, Tracking App for Clients', rating1: 5 },
    { id: 2, submittedAt: 'Jul 17, 02:48 PM', button1: 'Hi!', email1: '', text1: 'fsdfasd', button2: '', rating1: 3 },
    { id: 3, submittedAt: 'Jul 14, 04:25 PM', button1: 'Hi!', email1: '', text1: '', button2: '', rating1: 4 },
  ];

  return (
    <div className="response-table-container">
      <table className="response-table">
        <thead>
          <tr>
          <th></th>
            <th>Submitted at</th>
            <th>Button 1</th>
            <th>Email 1</th>
            <th>Text 1</th>
            <th>Button 2</th>
            <th>Rating 1</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response.id}>
                <td>{response.id}</td>
              <td>{response.submittedAt}</td>
              <td>{response.button1}</td>
              <td>{response.email1}</td>
              <td>{response.text1}</td>
              <td>{response.button2}</td>
              <td>{response.rating1}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResponseTable;