/* eslint-disable prefer-const */
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getChatResponse } from '@/lib/gemini'; // Assuming this is your API implementation

interface Message {
  content: string;
  isUser: boolean;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Context is now hardcoded and not exposed in the UI
  const contextText = `
   AXIS 25 - Tech Festival: A Comprehensive Overview
AXIS 25 is a groundbreaking technology festival launched in 2024, aimed at uniting the brightest minds in the tech world to explore the intersections of innovation, creativity, and cutting-edge advancements. Held on March 15, 2024, this event transcends the traditional conference format by offering a dynamic blend of interactive workshops, immersive tech exhibitions, and unparalleled networking opportunities. The festival's core mission is to create a transformative platform that bridges the gap between technological breakthroughs and human ingenuity, fostering a collaborative environment where ideas flourish. Its vision extends beyond a single event, aspiring to nurture a global community of forward-thinking innovators who will shape the future of technology in the digital age.
  `;
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');
    setIsLoading(true);

    // Add user message to chat
    setMessages(prev => [...prev, { content: userMessage, isUser: true }]);

    try {
      // Format conversation history for the API
      let conversationHistory = messages
        .map(msg => `${msg.isUser ? 'User' : 'Bot'}: ${msg.content}`)
        .join('\n');
      
      // Get response from API
      const response = await getChatResponse(userMessage, contextText, conversationHistory);
      
      // Add bot response to chat
      setMessages(prev => [...prev, { content: response, isUser: false }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        content: 'Sorry, I encountered an error while processing your request.',
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed z-50 right-4 bottom-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#00FFFF] hover:bg-[#00FFFF]/80 dark:bg-[#4169E1] dark:hover:bg-[#4169E1]/80 text-gray-900 dark:text-white rounded-full p-3 shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-[#00FFFF]/20 dark:border-[#00FFFF]/10 transition-all duration-300 transform origin-bottom-right animate-in fade-in slide-in-from-bottom-right">
          <div className="p-3 border-b dark:border-gray-700 bg-gradient-to-r from-[#00FFFF]/10 to-[#4169E1]/10 dark:from-[#00FFFF]/5 dark:to-[#4169E1]/5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Powered by Gemini AI</p>
          </div>
          
          <div 
            ref={chatContainerRef}
            className="p-3 space-y-3 overflow-y-auto h-80"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 p-2 rounded-lg text-sm transition-all duration-300 transform hover:scale-[1.02] ${
                    message.isUser 
                      ? 'bg-[#00FFFF] text-gray-900 dark:bg-[#4169E1] dark:text-white' 
                      : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-b-2 border-[#00FFFF] dark:border-[#4169E1] rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSendMessage} className="p-3 border-t dark:border-gray-700 bg-gradient-to-r from-[#00FFFF]/10 to-[#4169E1]/10 dark:from-[#00FFFF]/5 dark:to-[#4169E1]/5">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 p-2 text-sm border dark:border-gray-600 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#00FFFF] dark:focus:ring-[#4169E1] dark:bg-gray-700 dark:text-white transition-all duration-300 text-gray-900 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#00FFFF] hover:bg-[#00FFFF]/80 dark:bg-[#4169E1] dark:hover:bg-[#4169E1]/80 text-gray-900 dark:text-white px-3 py-1 text-sm rounded-lg transition-all duration-300 transform hover:scale-105"
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