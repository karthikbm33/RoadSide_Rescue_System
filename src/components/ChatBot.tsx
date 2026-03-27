import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

import { getGeminiResponse } from '../services/gemini';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: 'Hello! I am your Roadside Rescue AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      let botResponse = "";
      
      // Try n8n first as requested with a timeout
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

        const response = await fetch('https://pavankr789.app.n8n.cloud/webhook/7314f483-9e3d-4513-9182-fe441662ad36/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: controller.signal,
          body: JSON.stringify({ 
            message: userMessage,
            chatInput: userMessage // Common key for n8n AI nodes
          }),
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          console.log('n8n response data:', data);
          // Handle various response formats from n8n
          botResponse = data.output || data.response || data.message || data.text || (Array.isArray(data) ? data[0]?.output : "");
          
          // If data is just a string, use it
          if (!botResponse && typeof data === 'string') {
            botResponse = data;
          }
        } else {
          console.warn(`n8n returned status ${response.status}: ${response.statusText}`);
        }
      } catch (n8nError: any) {
        if (n8nError.name === 'AbortError') {
          console.warn('n8n request timed out, falling back to Gemini');
        } else {
          console.warn('n8n connection failed, falling back to Gemini:', n8nError);
        }
      }

      // If n8n failed or returned empty, use Gemini as a robust fallback
      if (!botResponse) {
        try {
          botResponse = await getGeminiResponse(userMessage);
        } catch (geminiError) {
          console.error('Gemini fallback also failed:', geminiError);
          botResponse = "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.";
        }
      }
      
      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm offline right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4 w-[350px] h-[500px] bg-white dark:bg-brand-dark flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 rounded-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-brand-green text-white flex justify-between items-center shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Rescue AI</h3>
                  <p className="text-[10px] opacity-80">Online & Ready to Help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-brand-dark/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-sm shadow-sm",
                    msg.role === 'user' 
                      ? "ml-auto bg-brand-green text-white rounded-tr-none" 
                      : "bg-white dark:bg-white/10 text-slate-800 dark:text-white/90 rounded-tl-none border border-slate-100 dark:border-white/5"
                  )}
                >
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div className="bg-white dark:bg-white/10 text-slate-800 dark:text-white/90 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/5 w-fit shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-brand-dark border-t border-slate-100 dark:border-white/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-brand-green transition-colors dark:text-white"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-brand-green text-white p-2 rounded-xl disabled:opacity-50 hover:brightness-110 transition-all shadow-md shadow-brand-green/20"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.6)] transition-all duration-300 relative group",
          isOpen ? "bg-brand-dark border border-white/10" : "bg-gradient-to-br from-brand-green to-emerald-600"
        )}
      >
        {isOpen ? <X className="w-7 h-7 text-white" /> : <MessageCircle className="w-7 h-7 text-white" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-brand-dark rounded-full animate-pulse" />
        )}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white dark:bg-brand-dark px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-xl border border-slate-100 dark:border-white/10 pointer-events-none">
          Need Help? Chat with AI
        </div>
      </motion.button>
    </div>
  );
};
