import React, { useState } from 'react';

function ChatInput({ onSendMessage, fieldType, options }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const renderInput = () => {
    switch (fieldType) {
      case 'Text':
      case 'Email':
      case 'Phone':
        return (
          <input
            type={fieldType.toLowerCase()}
            className="chatBot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter ${fieldType}`}
          />
        );
      case 'Number':
        return (
          <input
            type="number"
            className="chatBot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Number"
          />
        );
      case 'Date':
        return (
          <input
            type="date"
            className="chatBot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        );
      case 'Radio':
        return (
          <div className="chatBot-radio-group">
            {options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={option}
                  checked={input === option}
                  onChange={(e) => setInput(e.target.value)}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'Checkbox':
        return (
          <div className="chatBot-checkbox-group">
            {options.map((option, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={option}
                  checked={input.includes(option)}
                  onChange={(e) => {
                    const newInput = input.includes(option)
                      ? input.filter(item => item !== option)
                      : [...input, option];
                    setInput(newInput);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        );
      case 'StarRating':
        return (
          <div className="chatBot-star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setInput(star.toString())}
                className={star <= parseInt(input) ? 'active' : ''}
              >
                ★
              </span>
            ))}
          </div>
        );
      case 'WordRating':
        return (
          <select
            className="chatBot-select"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          >
            <option value="">Select a rating</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type="text"
            className="chatBot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your response"
          />
        );
    }
  };

  return (
    <form className="chatBot-input-form" onSubmit={handleSubmit}>
      {renderInput()}
      <button type="submit" className="chatBot-send-button">
        <span className="chatBot-send-icon">▶</span>
      </button>
    </form>
  );
}

export default ChatInput;