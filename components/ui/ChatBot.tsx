'use client';

import React, { useState } from 'react';

interface Message {
  text: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      text: inputText,
      isUser: true
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        text: 'Thanks for your message! This is a demo response.',
        isUser: false
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#00FFFF] hover:bg-[#00FFFF]/80 dark:bg-[#4169E1] dark:hover:bg-[#4169E1]/80 text-gray-900 dark:text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-[#00FFFF]/20 dark:border-[#00FFFF]/10 transition-all duration-300 transform origin-bottom-right animate-in fade-in slide-in-from-bottom-right">
          <div className="p-4 border-b dark:border-gray-700 bg-gradient-to-r from-[#00FFFF]/10 to-[#4169E1]/10 dark:from-[#00FFFF]/5 dark:to-[#4169E1]/5">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Chat with us</h3>
          </div>
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 p-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${message.isUser ? 'bg-[#00FFFF] text-gray-900 dark:bg-[#4169E1] dark:text-white' : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'}`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-gray-700 bg-gradient-to-r from-[#00FFFF]/10 to-[#4169E1]/10 dark:from-[#00FFFF]/5 dark:to-[#4169E1]/5">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FFFF] dark:focus:ring-[#4169E1] dark:bg-gray-700 dark:text-white transition-all duration-300 text-gray-900 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-[#00FFFF] hover:bg-[#00FFFF]/80 dark:bg-[#4169E1] dark:hover:bg-[#4169E1]/80 text-gray-900 dark:text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;