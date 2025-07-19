import { useState, useRef, useEffect } from 'react';
import { Message, ChatState } from '../types/chat';

export const useChat = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        content: 'Hello! I\'m your AI assistant. How can I help you today?',
        sender: 'ai',
        timestamp: new Date(),
        status: 'sent'
      }
    ],
    isTyping: false,
    isLoading: false,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages, chatState.isTyping]);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));

    // Update message status to sent
    setTimeout(() => {
      setChatState(prev => ({
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
        )
      }));
    }, 500);

    // Show typing indicator
    setTimeout(() => {
      setChatState(prev => ({ ...prev, isTyping: true }));
    }, 800);

    try {
      // Simulate AI response (replace with actual AI API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: 'ai',
        timestamp: new Date(),
        status: 'sent'
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiResponse],
        isTyping: false,
        isLoading: false
      }));

    } catch (error) {
      setChatState(prev => ({
        ...prev,
        messages: prev.messages.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'error' } : msg
        ),
        isTyping: false,
        isLoading: false
      }));
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    // Simple AI response simulation - replace with actual AI integration
    const responses = [
      "That's an interesting question! Let me help you with that.",
      "I understand what you're asking. Here's my perspective on that topic.",
      "Great question! Based on what you've shared, I think we should consider several factors.",
      "I'm happy to help you with that. Let me break this down for you.",
      "That's a thoughtful inquiry. Here's what I would recommend.",
    ];

    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      return "Hello there! It's great to meet you. What would you like to talk about today?";
    }

    if (userMessage.toLowerCase().includes('help')) {
      return "I'm here to help! I can assist you with questions, provide information, help with problem-solving, or just have a friendly conversation. What do you need help with?";
    }

    if (userMessage.toLowerCase().includes('how are you')) {
      return "I'm doing well, thank you for asking! I'm here and ready to help you with whatever you need. How are you doing today?";
    }

    return responses[Math.floor(Math.random() * responses.length)] + " " + 
           "Could you tell me more about what specifically you'd like to know?";
  };

  return {
    ...chatState,
    sendMessage,
    messagesEndRef
  };
};