import React from 'react';
import '../styles/Canvas.css';

function Canvas({ elements }) {
  return (
    <div className="canvas">
      {elements.map((element) => (
        <div key={element.id} className="form-element">
          <h3>{element.label}</h3>
          {element.type !== 'Start' && (
            <>
              <input type="text" placeholder="Click to add link" className="element-input" />
              <div className="element-handle"></div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Canvas;