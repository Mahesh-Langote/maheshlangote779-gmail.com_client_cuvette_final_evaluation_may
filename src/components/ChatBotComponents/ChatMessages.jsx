import React from 'react';
import '../../styles/ChatBot.css';

function ChatMessages({ messages }) {
  return (
    <div className="chatBot-messages">
      {messages.map((message, index) => (
        <div key={index} className={`chatBot-message chatBot-${message.type}`}>
          {message.type === 'bot' && <div className="chatBot-avatar"></div>}
          {message.type === 'image' ? (
            <img src={`/images/${message.content}.jpg`} alt={message.content} className="chatBot-image" />
          ) : (
            <span className="chatBot-content">{message.content}</span>
          )}
          {message.type === 'user' && <div className="chatBot-user-response">Hi</div>}
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;