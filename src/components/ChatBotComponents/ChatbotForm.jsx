import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import API_ENDPOINTS from '../../config/api';
import '../../styles/ChatBot.css';

function ChatbotForm({ formId }) {
  const [form, setForm] = useState(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(-1);
  const [responses, setResponses] = useState({});
  const [messages, setMessages] = useState([]);
  const [uniqueId, setUniqueId] = useState('');
  const [isGreetingReceived, setIsGreetingReceived] = useState(false);
  const [theme, setTheme] = useState('Light'); // Default theme
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (formId) {
      fetchForm();
      generateUniqueId();
    }
  }, [formId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateUniqueId = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.apiGenerateUniqueId(formId));
      setUniqueId(response.data.uniqueId);
    } catch (error) {
      console.error('Error generating unique ID:', error);
      setMessages([{ type: 'bot', content: 'Error generating unique ID. Please try again later.' }]);
    }
  };

  const fetchForm = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/forms/public/${formId}`);
      setForm(response.data);
      
      // Set the theme based on the form's background
      setTheme(response.data.background || 'Light');
     
      setMessages([
        { type: 'bot', content: 'Hello!' },
        { type: 'bot', content: `Form Title: ${response.data.title}` },
        { type: 'bot', content: `Form Description: ${response.data.description}` },
        { type: 'bot', content: 'Please send any greeting message to start the form.' },
      ]);
    } catch (error) {
      console.error('Error fetching form:', error);
      setMessages([{ type: 'bot', content: 'Error loading the form. Please try again later.' }]);
    }
  };

  const askNextQuestion = (index) => {
    if (form && form.fields && index < form.fields.length) {
      const field = form.fields[index];
      const requiredText = field.required ? ' (Required)' : ' (Optional)';
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: field.errorMessage + requiredText, 
        fieldType: field.type, 
        options: field.options,
        required: field.required
      }]);
      console.log(field);
    } else if (form && index === form.fields.length) {
      setMessages(prev => [...prev, { type: 'bot', content: 'Thank you for completing the form!' }]);
      submitResponses();
    }
  };

  const handleUserResponse = async (response) => {
    setMessages(prev => [...prev, { type: 'user', content: response }]);

    if (!isGreetingReceived) {
      setIsGreetingReceived(true);
      setMessages(prev => [...prev, { type: 'bot', content: "Great! Let's start with the form questions." }]);
      setCurrentFieldIndex(0);
      askNextQuestion(0);
    } else if (form && form.fields && currentFieldIndex < form.fields.length) {
      const currentField = form.fields[currentFieldIndex];
      setResponses(prev => ({ ...prev, [currentField._id]: response }));
      
      await submitResponses([{ field: currentField.label, value: response }]);
      
      setCurrentFieldIndex(prev => prev + 1);
      askNextQuestion(currentFieldIndex + 1);
    }
  };

  const handleSkip = () => {
    if (form && form.fields && currentFieldIndex < form.fields.length) {
      const currentField = form.fields[currentFieldIndex];
      setMessages(prev => [...prev, { type: 'user', content: 'Skipped' }]);
      setMessages(prev => [...prev, { type: 'bot', content: `Okay, I've skipped the "${currentField.label}" field.` }]);
      setCurrentFieldIndex(prev => prev + 1);
      askNextQuestion(currentFieldIndex + 1);
    }
  };

  const submitResponses = async (newResponses = []) => {
    if (form) {
      try {
        const submissionData = {
          formId: form._id,
          uniqueId: uniqueId,
          responses: newResponses
        };

        await axios.post(API_ENDPOINTS.apiSubmissions, submissionData);
      } catch (error) {
        console.error('Error submitting responses:', error);
      }
    }
  };

  if (!form || !uniqueId) return <div className="chatBot-loading">Loading...</div>;

  return (
    <div className={`chatBot-wrapper ${theme.toLowerCase()}`}>
      <div className="chatBot-container">
        <div className="chatBot-messages">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatInput 
          onSendMessage={handleUserResponse} 
          onSkip={handleSkip}
          field={isGreetingReceived && form && form.fields ? form.fields[currentFieldIndex] : null}
        />
      </div>
    </div>
  );
}

export default ChatbotForm;