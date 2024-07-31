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
  // const [formIdData, setFormIdData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [uniqueId, setUniqueId] = useState('');
  const [isGreetingReceived, setIsGreetingReceived] = useState(false);
  const [theme, setTheme] = useState('Light'); // Default theme
  const messagesEndRef = useRef(null); 
  const fetchedRef = useRef(false);
  const [formIdData, setFormIdData] = useState(null);

  // useEffect(() => {
  //   if (formId) {
  //     fetchForm();
  //     generateUniqueId();
  //   }
  // }, [formId]);

  useEffect(() => {
    if (formId) {
      fetchFormAndUniqueId();
    }
  }, [formId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const generateUniqueId = async () => {
  //   try {
  //     const response = await axios.get(API_ENDPOINTS.apiGenerateUniqueId(formId));
  //     setUniqueId(response.data.uniqueId);
  //   } catch (error) {
  //     console.error('Error generating unique ID:', error);
  //     setMessages([{ type: 'bot', content: 'Error generating unique ID. Please try again later.' }]);
  //   }
  // };
  useEffect(() => {
    if (formId && !fetchedRef.current) {
      fetchFormAndUniqueId();
    }
  }, [formId]);

  const fetchFormAndUniqueId = async () => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
  
    try {
      const formResponse = await axios.get(API_ENDPOINTS.apiFormsPublic(formId));
      const formData = formResponse.data;  
      setForm(formData);
      setFormIdData(formData.id);
      setTheme(formData.background || 'Light'); 
      const uniqueIdResponse = await axios.get(API_ENDPOINTS.apiGenerateUniqueId(formId));
      setUniqueId(uniqueIdResponse.data.uniqueId);
 
      setMessages([
        { type: 'bot', content: 'Hello!' },
        { type: 'bot', content: `${formData.title}` },
        { type: 'bot', content: `${formData.description}` },
      ]);

      console.log("Using form ID:", formData.id);
    } catch (error) {
      console.error('Error fetching form and unique ID:', error);
      setMessages([{ type: 'bot', content: 'Error loading the form. Please try again later.' }]);
    } finally {
      fetchedRef.current = true;  
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
      
      try {
        const submissionResponse = await submitResponses([{ field: currentField.label, value: response }]);
        console.log("Submission successful:", submissionResponse);
      } catch (error) {
        console.error("Error during submission:", error);
        setMessages(prev => [...prev, { type: 'bot', content: "There was an error submitting your response. Please try again." }]);
        return;  
      }
      
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
    if (form && formIdData) {
      try {
        console.log("Submitting form ID:", formIdData);
        const submissionData = {
          formId: formIdData,  
          uniqueId: uniqueId,
          responses: newResponses
        };
  
        console.log("Submission data:", submissionData);
  
        const response = await axios.post(API_ENDPOINTS.apiSubmissions, submissionData);
        console.log("Submission response:", response.data);
        return response.data;
      } catch (error) {
        console.error('Error submitting responses:', error);
        throw error;
      }
    } else {
      console.error('Form or formIdData is not available');
      throw new Error('Form or formIdData is not available');
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