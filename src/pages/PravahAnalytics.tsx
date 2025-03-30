import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search,
  LineChart,
  PieChart,
  Calendar
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockSentimentData = [
  { date: '2024-03-01', sentiment: 'bullish', price: 150 },
  { date: '2024-03-02', sentiment: 'neutral', price: 148 },
  { date: '2024-03-03', sentiment: 'bearish', price: 145 },
  { date: '2024-03-04', sentiment: 'bullish', price: 152 },
  { date: '2024-03-05', sentiment: 'bullish', price: 158 },
];

const PravahAnalytics = () => {
  const [asset, setAsset] = useState('');
  const [currentSentiment, setCurrentSentiment] = useState<'bullish' | 'bearish' | 'neutral'>('neutral');
  const [loading, setLoading] = useState(false);

  const analyzeSentiment = async () => {
    if (!asset) return;
    
    setLoading(true);
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setCurrentSentiment('bullish');
    setLoading(false);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish':
        return <TrendingUp className="w-6 h-6 text-green-500" />;
      case 'bearish':
        return <TrendingDown className="w-6 h-6 text-red-500" />;
      default:
        return <Minus className="w-6 h-6 text-gray-500" />;
    }
  };

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
            Pravah Analytics Dashboard
          </h1>
          <p className="text-gray-400">
            AI-Powered Market Sentiment Analysis
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          className="mb-12"
          {...fadeIn}
        >
          <div className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                  placeholder="Enter asset name (e.g., AAPL, BTC, ETH)"
                  className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
              <button
                onClick={analyzeSentiment}
                disabled={loading || !asset}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Current Sentiment */}
          <motion.div 
            className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10"
            {...fadeIn}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Current Sentiment</h3>
              <Calendar className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex items-center gap-4">
              {getSentimentIcon(currentSentiment)}
              <span className="text-2xl font-bold capitalize">
                {currentSentiment}
              </span>
            </div>
          </motion.div>

          {/* Sentiment Distribution */}
          <motion.div 
            className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10"
            {...fadeIn}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Sentiment Distribution</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex justify-around">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">60%</div>
                <div className="text-sm text-gray-400">Bullish</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-500">25%</div>
                <div className="text-sm text-gray-400">Neutral</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">15%</div>
                <div className="text-sm text-gray-400">Bearish</div>
              </div>
            </div>
          </motion.div>

          {/* Market Impact */}
          <motion.div 
            className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10"
            {...fadeIn}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Market Impact</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400">High</div>
            <p className="text-sm text-gray-400">Based on news volume and reach</p>
          </motion.div>
        </div>

        {/* Sentiment Timeline */}
        <motion.div 
          className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 mb-12"
          {...fadeIn}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Sentiment Timeline</h3>
            <LineChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={mockSentimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="date" 
                  stroke="rgba(255,255,255,0.5)"
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(17, 24, 39, 0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#60A5FA" 
                  strokeWidth={2}
                  dot={{ fill: '#60A5FA' }}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent News Analysis */}
        <motion.div 
          className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10"
          {...fadeIn}
        >
          <h3 className="text-lg font-semibold mb-6">Recent News Analysis</h3>
          <div className="space-y-4">
            {mockSentimentData.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
              >
                {getSentimentIcon(item.sentiment)}
                <div>
                  <div className="font-medium">{item.date}</div>
                  <div className="text-sm text-gray-400 capitalize">
                    Sentiment: {item.sentiment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PravahAnalytics;