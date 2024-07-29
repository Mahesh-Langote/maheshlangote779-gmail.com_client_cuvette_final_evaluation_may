import React, { useState } from 'react';

function ChatInput({ onSendMessage, onSkip, field }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const validateInput = () => {
    if (!field) return true; // No validation for greeting message

    if (field.required && !input.trim()) {
      setError('This field is required.');
      return false;
    }

    switch (field.type) {
      case 'Email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input)) {
          setError('Please enter a valid email address.');
          return false;
        }
        break;
      case 'Phone':
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(input)) {
          setError('Please enter a valid 10-digit phone number.');
          return false;
        }
        break;
      case 'Number':
        if (isNaN(input)) {
          setError('Please enter a valid number.');
          return false;
        }
        break;
    }

    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInput()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const renderInput = () => {
    if (!field) {
      return (
        <input
          type="text"
          className="chatBot-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
      );
    }

    switch (field.type) {
      case 'Text':
      case 'Email':
      case 'Phone':
        return (
          <input
            type={field.type.toLowerCase()}
            className="chatBot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter ${field.label}`}
          />
        );
      case 'Number':
        return (
          <input
            type="number"
            className="chatBot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Enter ${field.label}`}
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
            {field.options.map((option, index) => (
              <label key={index} className="chatBot-radio-label">
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
            {field.options.map((option, index) => (
              <label key={index} className="chatBot-checkbox-label">
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
              <button
                key={star}
                onClick={() => setInput(star.toString())}
                className={star <= parseInt(input) ? 'active' : ''}
              >
                {star}
              </button>
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
            {field.options.map((option, index) => (
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
            placeholder={`Enter ${field.label}`}
          />
        );
    }
  };

  return (
    <form className="chatBot-input-form" onSubmit={handleSubmit}>
      {renderInput()}
      {error && <div className="chatBot-error">{error}</div>}
      <div className="chatBot-button-group">
        {field && !field.required && (
          <button type="button" className="chatBot-skip-button" onClick={onSkip}>
            Skip
          </button>
        )}
        <button type="submit" className="chatBot-send-button">
          <span className="chatBot-send-icon">▶</span>
        </button>
      </div>
    </form>
  );
}

export default ChatInput;