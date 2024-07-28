// components/Canvas.js
import React from 'react';
import '../styles/Canvas.css';

function Canvas({ elements, setFormData, description, onDescriptionChange }) {
  const updateElement = (id, updates) => {
    setFormData(prevData => ({
      ...prevData,
      fields: prevData.fields.map(field => 
        field.id === id ? { ...field, ...updates } : field
      )
    }));
  };

  return (
    <div className="canvas">
      <textarea
        className="form-description"
        placeholder="Enter form description"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
      />
      {elements.map((element) => (
        <div key={element.id} className="form-element">
          <input
            type="text"
            placeholder="Enter label"
            value={element.label}
            onChange={(e) => updateElement(element.id, { label: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter error message"
            value={element.errorMessage}
            onChange={(e) => updateElement(element.id, { errorMessage: e.target.value })}
          />
          <label>
            <input
              type="checkbox"
              checked={element.required}
              onChange={(e) => updateElement(element.id, { required: e.target.checked })}
            />
            Required
          </label>
          {(element.type === 'radio' || element.type === 'wordRating') && (
            <div>
              <h4>Options:</h4>
              {element.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...element.options];
                    newOptions[index] = e.target.value;
                    updateElement(element.id, { options: newOptions });
                  }}
                />
              ))}
              <button onClick={() => updateElement(element.id, { options: [...element.options, ''] })}>
                Add Option
              </button>
            </div>
          )}
          {element.type === 'starRating' && (
            <div>
              <label>
                Number of stars:
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={element.starCount}
                  onChange={(e) => updateElement(element.id, { starCount: parseInt(e.target.value) })}
                />
              </label>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Canvas;