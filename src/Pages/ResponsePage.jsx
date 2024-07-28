import React from 'react';
import ResponseSummary from '../components/ResponseSummary';
import ResponseTable from '../components/ResponseTable';
import '../styles/ResponsePage.css';
import FormHeader from '../components/FormHeader';

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