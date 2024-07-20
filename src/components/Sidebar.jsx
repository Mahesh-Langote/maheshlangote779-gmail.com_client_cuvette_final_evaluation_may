import React from 'react';
import '../styles/sidebar.css';

function Sidebar({ addElement }) {
  const bubbles = [
    { type: 'Text', icon: '📝' },
    { type: 'Image', icon: '🖼️' },
    { type: 'Video', icon: '🎥' },
    { type: 'GIF', icon: 'GIF' },
  ];

  const inputs = [
    { type: 'Text', icon: 'T' },
    { type: 'Number', icon: '#' },
    { type: 'Email', icon: '@' },
    { type: 'Phone', icon: '📞' },
    { type: 'Date', icon: '📅' },
    { type: 'Rating', icon: '⭐' },
    { type: 'Button', icon: '🔘' },
  ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Bubbles</h2>
      <div className="element-grid">
        {bubbles.map((element) => (
          <button
            key={element.type}
            className="element-button"
            onClick={() => addElement(element.type)}
          >
            <span className="element-icon">{element.icon}</span>
            <span className="element-type">{element.type}</span>
          </button>
        ))}
      </div>
      <h2 className="sidebar-title">Inputs</h2>
      <div className="element-grid">
        {inputs.map((element) => (
          <button
            key={element.type}
            className="element-button"
            onClick={() => addElement(element.type)}
          >
            <span className="element-icon">{element.icon}</span>
            <span className="element-type">{element.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;