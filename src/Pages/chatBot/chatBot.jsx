import React from 'react';
import ChatbotForm from '../../components/ChatBotComponents/ChatbotForm';
import { useParams } from 'react-router-dom'; 

function ChatBot() {
  const { formId } = useParams();
  
  return (
    <div className="chatBot-wrapper">
      <ChatbotForm formId={formId} />
    </div>
  );
}

export default ChatBot;