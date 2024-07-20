import React from 'react';
import ResponseSummary from './ResponseSummary';
import ResponseTable from './ResponseTable';
import '../styles/ResponsePage.css';
import FormHeader from './FormHeader';

function ResponsePage() {
  return (
   <>
   <FormHeader />
    <div className="response-page">
      <div className="response-content">
        <ResponseSummary />
        <ResponseTable />
      </div>
    </div>
   </>
  );
}

export default ResponsePage;