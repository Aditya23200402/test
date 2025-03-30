import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Send, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const GuruAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI financial advisor. How can I help you with your investment decisions today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = {
        role: 'assistant' as const,
        content: `Based on your query about "${input}", here's my analysis: This is a simulated response demonstrating how the AI advisor would provide personalized financial guidance.`
      };
      setMessages(prev => [...prev, response]);
      setLoading(false);
    }, 1000);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600">
            Guru Advisor
          </h1>
          <p className="text-gray-400">
            Your AI-powered financial advisor for personalized investment guidance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Section */}
          <div className="lg:col-span-2">
            <motion.div 
              className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 h-[600px] flex flex-col"
              {...fadeIn}
            >
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-4 ${
                        message.role === 'user'
                          ? 'bg-purple-500/20 ml-4'
                          : 'bg-white/5 mr-4'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <div className="flex items-center mb-2">
                          <Brain className="w-5 h-5 text-purple-400 mr-2" />
                          <span className="text-purple-400 font-semibold">Guru AI</span>
                        </div>
                      )}
                      <p className="text-white">{message.content}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask for financial advice..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || loading}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-3 rounded-xl flex items-center gap-2 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <Send className="w-5 h-5" />
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Features Section */}
          <motion.div 
            className="space-y-6"
            {...fadeIn}
          >
            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
                Key Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Personalized investment advice
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Risk assessment and portfolio analysis
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Market trend insights
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 text-purple-400 mr-2" />
                  Real-time financial guidance
                </li>
              </ul>
            </div>

            <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <MessageCircle className="w-5 h-5 text-purple-400 mr-2" />
                Sample Questions
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>"How should I diversify my portfolio?"</li>
                <li>"What's your view on cryptocurrency investments?"</li>
                <li>"How can I start investing with limited capital?"</li>
                <li>"What are the risks of margin trading?"</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GuruAdvisor;