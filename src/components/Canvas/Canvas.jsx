import React, { useState, useRef, useEffect } from 'react';

import './Canvas.css';

function Canvas({ elements, setFormData, description, onDescriptionChange }) {
  const [warning, setWarning] = useState('');
  const endOfCanvasRef = useRef(null);

  useEffect(() => {
    endOfCanvasRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [elements]);

  const updateElement = (id, updates) => {
    setFormData(prevData => ({
      ...prevData,
      fields: prevData.fields.map(field => 
        field.id === id ? { ...field, ...updates } : field
      )
    }));
  };

  const addOption = (id) => {
    setFormData(prevData => ({
      ...prevData,
      fields: prevData.fields.map(field => 
        field.id === id ? { ...field, options: [...(field.options || []), `Option ${field.options.length + 1}`] } : field
      )
    }));
  };

  const removeOption = (id, index) => {
    setFormData(prevData => ({
      ...prevData,
      fields: prevData.fields.map(field => 
        field.id === id ? { ...field, options: field.options.filter((_, i) => i !== index) } : field
      )
    }));
  };

  const removeField = (id) => {
    setFormData(prevData => {
      if (prevData.fields.length > 1) {
        setWarning('');
        return {
          ...prevData,
          fields: prevData.fields.filter(field => field.id !== id)
        };
      } else {
        setWarning('At least one form field is required');
        return prevData;
      }
    });
  };

  const renderFieldOptions = (element) => {
    switch (element.type) {
      case 'Text':
      case 'Number':
      case 'Email':
      case 'Phone':
      case 'Date':
        return null;
      case 'Radio':
      case 'Checkbox':
      case 'Dropdown':
      case 'WordRating':
        return (
          <div className="canvasBoard__fieldOptions">
            <h4>Options:</h4>
            {element.options.map((option, index) => (
              <div key={index} className="canvasBoard__optionContainer">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...element.options];
                    newOptions[index] = e.target.value;
                    updateElement(element.id, { options: newOptions });
                  }}
                  className="canvasBoard__optionInput"
                />
                <button 
                  className="canvasBoard__removeOptionButton"
                  onClick={() => removeOption(element.id, index)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button 
              className="canvasBoard__addOptionButton"
              onClick={() => addOption(element.id)}
            >
              Add Option
            </button>
          </div>
        );
      case 'StarRating':
        return (
          <div className="canvasBoard__starRating">
            <label>
              Number of stars:
              <input
                type="number"
                min="1"
                max="10"
                value={element.starCount || 5}
                onChange={(e) => updateElement(element.id, { starCount: parseInt(e.target.value) })}
              />
            </label>
          </div>
        );
      case 'Image':
      case 'Video':
      case 'GIF':
        return (
          <div>
            <input
              type="text"
              placeholder="Enter URL"
              value={element.url || ''}
              onChange={(e) => updateElement(element.id, { url: e.target.value })}
              className="canvasBoard__mediaInput"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="canvasBoard">
      {warning && <div className="canvasBoard__warning">{warning}</div>}
      <textarea
        className="canvasBoard__description"
        placeholder="Enter form description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      {elements.map((element) => (
        <div key={element.id} className="canvasBoard__element">
          <div className="canvasBoard__elementHeader">
            <input
              type="text"
              placeholder="Enter label"
              value={element.label}
              onChange={(e) => updateElement(element.id, { label: e.target.value })}
              className="canvasBoard__input canvasBoard__input--label"
            />
            <button 
              className="canvasBoard__removeButton"
              onClick={() => removeField(element.id)}
            >
              ✕
            </button>
          </div>
          <input
            type="text"
            placeholder="Enter error message"
            value={element.errorMessage}
            onChange={(e) => updateElement(element.id, { errorMessage: e.target.value })}
            className="canvasBoard__input canvasBoard__input--error"
          />
          <label className="canvasBoard__requiredLabel">
            <input
              type="checkbox"
              checked={element.required}
              onChange={(e) => updateElement(element.id, { required: e.target.checked })}
              className="canvasBoard__checkbox"
            />
            Required
          </label>
          <div className="canvasBoard__options">
            {renderFieldOptions(element)}
          </div>
        </div>
      ))}
      <div ref={endOfCanvasRef} />
    </div>
  );
}

export default Canvas;