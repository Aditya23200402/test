import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Calculator,
  MessageCircle,
  Brain,
  ArrowRight
} from 'lucide-react';

const PravahAnalytics = () => {
  const navigate = useNavigate();
  
  const tools = [
    {
      id: 'sentiment',
      name: 'Sentiment Analyzer',
      description: 'AI-powered market sentiment analysis for assets and stocks',
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      path: '/pravah/sentiment'
    },
    {
      id: 'black-scholes',
      name: 'Black-Scholes Calculator',
      description: 'Advanced options pricing and Greeks calculator',
      icon: Calculator,
      color: 'from-green-500 to-green-600',
      path: '/pravah/black-scholes'
    },
    {
      id: 'guru',
      name: 'Guru Advisor',
      description: 'AI-powered financial advisor for personalized investment guidance',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      path: '/pravah/guru'
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Pravah Analytics Suite
          </h1>
          <p className="text-gray-400">
            Advanced ML-powered tools for comprehensive financial analysis
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => (
            <motion.div
              key={tool.id}
              className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(tool.path)}
              {...fadeIn}
            >
              <div className="p-6">
                <div className={`inline-block p-3 rounded-xl bg-gradient-to-r ${tool.color} mb-4`}>
                  <tool.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                <p className="text-gray-400 mb-4">{tool.description}</p>
                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span className="mr-2">Launch Tool</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <motion.div 
          className="backdrop-blur-xl bg-white/5 p-8 rounded-2xl border border-white/10"
          {...fadeIn}
        >
          <h2 className="text-2xl font-bold mb-6">Why Choose Pravah Analytics?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start space-x-4">
              <BarChart3 className="w-6 h-6 text-blue-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Advanced Analytics</h3>
                <p className="text-gray-400">Powered by sophisticated ML models for accurate insights</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Brain className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">AI-Driven Insights</h3>
                <p className="text-gray-400">Intelligent analysis of market trends and patterns</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MessageCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-400">Professional-grade tools for informed decision making</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PravahAnalytics;