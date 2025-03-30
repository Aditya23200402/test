import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Routes, Route, Link } from 'react-router-dom';
import PravahAnalytics from './pages/PravahAnalytics';
import BlackScholesCalculator from './components/BlackScholesCalculator';
import GuruAdvisor from './components/GuruAdvisor';
import SentimentAnalyzer from './components/SentimentAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center"></div>
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gray-800/70 border-b border-white/10 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <Link to="/" className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Udgam</span>
            </Link>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex space-x-8"
          >
            <Link to="/" className="hover:text-blue-400 transition-colors font-medium">Analytics</Link>
            <a href="#" className="hover:text-blue-400 transition-colors font-medium">About Us</a>
            <a href="#" className="hover:text-blue-400 transition-colors font-medium">Contact</a>
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<PravahAnalytics />} />
        <Route path="/pravah/sentiment" element={<SentimentAnalyzer />} />
        <Route path="/pravah/black-scholes" element={<BlackScholesCalculator />} />
        <Route path="/pravah/guru" element={<GuruAdvisor />} />
      </Routes>
    </div>
  );
}

export default App;