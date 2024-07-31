
import React from 'react';

function ChatMessage({ message }) {
  const renderContent = () => {
    switch (message.fieldType) {
      case 'Image':
        return <img src={message.content} alt="Form content" className="chatBot-image" />;
      case 'GIF':
        return <img src={message.content} alt="Form content" className="chatBot-gif" />;
      case 'Video':
        return <video src={message.content} controls className="chatBot-video" />;
      default:
        return <span className="chatBot-content">{message.content}</span>;
    }
  };

  return (
    <div className={`chatBot-message chatBot-${message.type}`}>
      {message.type === 'bot' && <div className="chatBot-avatar"></div>}
      {renderContent()}
    </div>
  );
}

export default ChatMessage;
