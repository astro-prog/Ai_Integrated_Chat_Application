import React from 'react';
import { Message } from '../types/chat';
import { Check, CheckCheck, AlertCircle } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isLatest: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLatest }) => {
  const isUser = message.sender === 'user';
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getStatusIcon = () => {
    switch (message.status) {
      case 'sending':
        return <Check className="w-3 h-3 text-blue-300" />;
      case 'sent':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      case 'error':
        return <AlertCircle className="w-3 h-3 text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`flex mb-4 animate-slideIn ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
      style={{
        animationDelay: isLatest ? '0ms' : '0ms'
      }}
    >
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-4'
            : 'bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-800 mr-4'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <div className={`flex items-center justify-between mt-2 ${
          isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span className="text-xs">
            {formatTime(message.timestamp)}
          </span>
          {isUser && (
            <div className="ml-2">
              {getStatusIcon()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};