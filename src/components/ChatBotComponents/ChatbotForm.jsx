import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput';
import '../../styles/ChatBot.css';

function ChatbotForm({ formId }) {
  const [form, setForm] = useState(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchForm();
  }, [formId]);

  const fetchForm = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/forms/public/${formId}`);
      setForm(response.data);
      setMessages([
        { type: 'bot', content: `Welcome to ${response.data.title}!` },
        { type: 'bot', content: response.data.description },
      ]);
      askNextQuestion(0);
    } catch (error) {
      console.error('Error fetching form:', error);
    }
  };

  const askNextQuestion = (index) => {
    if (form && index < form.fields.length) {
      const field = form.fields[index];
      setMessages(prev => [...prev, { type: 'bot', content: field.label, fieldType: field.type, options: field.options }]);
    } else if (form && index === form.fields.length) {
      setMessages(prev => [...prev, { type: 'bot', content: 'Thank you for completing the form!' }]);
      console.log('Form responses:', responses);
      // Here you would typically submit the responses to your backend
    }
  };

  const handleUserResponse = (response) => {
    const currentField = form.fields[currentFieldIndex];
    setResponses(prev => ({ ...prev, [currentField._id]: response }));
    setMessages(prev => [...prev, { type: 'user', content: response }]);
    setCurrentFieldIndex(prev => prev + 1);
    askNextQuestion(currentFieldIndex + 1);
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div className="chatBot-container">
      <div className="chatBot-messages">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
      </div>
      {currentFieldIndex < form.fields.length && (
        <ChatInput 
          onSendMessage={handleUserResponse} 
          fieldType={form.fields[currentFieldIndex].type}
          options={form.fields[currentFieldIndex].options}
        />
      )}
    </div>
  );
}

export default ChatbotForm;