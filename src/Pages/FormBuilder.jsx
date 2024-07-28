import React, { useState } from 'react';
import FormHeader from '../components/FormHeader';
import Sidebar from '../components/Sidebar';
import Canvas from '../components/Canvas';
import '../styles/formBuilder.css';

function FormBuilder() {
  const [formElements, setFormElements] = useState([
    { type: ' Start', id: 'start', label: 'Start' },
   
  ]);

  const addElement = (elementType) => {
    setFormElements([...formElements, { type: elementType, id: Date.now(), label: `${elementType} ${formElements.length + 1}` }]);
  };

  return (
    <div className="form-builder">
      <FormHeader />
      <div className="main-content">
        <Sidebar addElement={addElement} />
        <Canvas elements={formElements} />
      </div>
    </div>
  );
}

export default FormBuilder;