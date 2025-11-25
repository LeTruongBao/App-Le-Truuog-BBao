import React, { useState, useRef, useEffect } from 'react';
import { Language, Message } from '../types';
import { chatWithGemini } from '../services/geminiService';
import { Send, User, Bot, Loader2, Building2 } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

interface VisaChatbotProps {
  language: Language;
}

export const VisaChatbot: React.FC<VisaChatbotProps> = ({ language }) => {
  const t = TRANSLATIONS;
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'model',
      text: language === 'vi' 
        ? "Xin chào! Tôi sẽ hỗ trợ bạn thông tin Visa từ nguồn HiKorea và Bộ Tư pháp. Bạn cần giúp gì?" 
        : "Hello! I provide Visa info based on HiKorea & MOJ official data. How can I help?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Pass 'visa' context to ensure official sources are used
      const responseText = await chatWithGemini(inputText, language, 'visa');
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "I'm having trouble accessing the information.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfficialCheck = () => {
     const officialMsg: Message = {
        id: Date.now().toString(),
        role: 'model',
        text: t.officialResponseMsg[language] || t.officialResponseMsg['en'],
        timestamp: new Date()
     };
     setMessages(prev => [...prev, officialMsg]);
  };

  return (
    <div className="flex flex-col h-full bg-wild-blue/20">
      <div className="p-4 border-b bg-white shadow-sm sticky top-0 z-10">
        <h2 className="text-lg font-bold text-brand-blue flex items-center gap-2">
            <Bot className="text-brand-yellow fill-current" />
            Visa & Admin AI
        </h2>
        <p className="text-xs text-gray-500">Powered by Official HiKorea Data</p>
        
        {/* New Button for Official Agency Response */}
        <button 
            onClick={handleOfficialCheck}
            className="mt-3 w-full flex items-center justify-center gap-2 bg-gray-800 text-white text-xs font-medium py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
        >
            <Building2 size={14} />
            {t.officialResponseBtn[language]}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-wild-blue/20">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                msg.role === 'user'
                  ? 'bg-brand-blue text-white rounded-br-none'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
              }`}
            >
              {msg.role === 'model' && (
                <div className="text-xs font-bold text-brand-blue mb-1 flex items-center gap-1">
                    <Bot size={12}/> K-Bot {msg.text.includes('[Official]') || msg.text.includes('[Chính thức]') ? '(Agency)' : ''}
                </div>
              )}
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm">
                    <Loader2 className="animate-spin text-brand-blue" size={20} />
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:border-brand-blue focus-within:bg-white transition-colors">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-400"
            placeholder={language === 'vi' ? "Hỏi về Visa D-2, D-10, làm thẻ..." : "Ask about Visa, ARC..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()}
            className="p-2 bg-brand-blue text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-all shadow-md"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};