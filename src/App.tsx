import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MessageCircle, BarChart3, Users, LineChart, Search, Shield, Network, Building2, ArrowUpRight } from 'lucide-react';
import PravahAnalytics from './pages/PravahAnalytics';

function App() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const stats = [
    { number: "500+", label: "Startups Funded", change: "+12% from last month", icon: Building2 },
    { number: "2,000+", label: "Active Investors", change: "+8% from last month", icon: Users },
    { number: "₹10Cr+", label: "Total Funding", change: "+15% from last month", icon: LineChart },
    { number: "78%", label: "Success Rate", change: "+3% from last month", icon: ArrowUpRight }
  ];

  const features = [
    { title: "AI-Powered Analytics", description: "Get comprehensive insights from our ML models for better decision making", icon: BarChart3 },
    { title: "Smart Chatbot Support", description: "Get answers to your questions and understand how UDgam works", icon: MessageCircle },
    { title: "Startup Growth Tracking", description: "Monitor startup performance with real-time metrics and KPI tracking", icon: LineChart },
    { title: "Smart Startup Matching", description: "Find the perfect startups to invest in based on your preferences", icon: Search },
    { title: "Secure Transactions", description: "Safe and transparent investment process with complete security", icon: Shield },
    { title: "Community Network", description: "Connect with other investors, entrepreneurs and mentors", icon: Network }
  ];

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
            <TrendingUp className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Udgam</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex space-x-8"
          >
            <a href="#" className="hover:text-blue-400 transition-colors font-medium">Home</a>
            <a href="#" className="hover:text-blue-400 transition-colors font-medium">About Us</a>
            <a href="#" className="hover:text-blue-400 transition-colors font-medium">Contact</a>
          </motion.div>
        </div>
      </nav>

      {/* Main Content */}
      <PravahAnalytics />
    </div>
  );
}

export default App;