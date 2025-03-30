import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, TrendingDown, LineChart } from 'lucide-react';
import { BlackScholesCalculator, GreeksResult } from '../utils/blackScholes';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface InputState {
  spotPrice: number;
  strikePrice: number;
  timeToMaturity: number;
  volatility: number;
  riskFreeRate: number;
}

const BlackScholesComponent: React.FC = () => {
  const [inputs, setInputs] = useState<InputState>({
    spotPrice: 100,
    strikePrice: 100,
    timeToMaturity: 1,
    volatility: 0.2,
    riskFreeRate: 0.05
  });

  const [results, setResults] = useState({
    callPrice: 0,
    putPrice: 0,
    callGreeks: {} as GreeksResult,
    putGreeks: {} as GreeksResult
  });

  const calculateResults = () => {
    const calculator = new BlackScholesCalculator(
      inputs.riskFreeRate,
      inputs.spotPrice,
      inputs.strikePrice,
      inputs.timeToMaturity,
      inputs.volatility
    );

    setResults({
      callPrice: Number(calculator.calculatePrice('Call').toFixed(2)),
      putPrice: Number(calculator.calculatePrice('Put').toFixed(2)),
      callGreeks: calculator.calculateGreeks('Call'),
      putGreeks: calculator.calculateGreeks('Put')
    });
  };

  useEffect(() => {
    calculateResults();
  }, [inputs]);

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
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
            Black-Scholes Calculator
          </h1>
          <p className="text-gray-400">
            Advanced Options Pricing and Greeks Calculator
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10 mb-8"
          {...fadeIn}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Spot Price
              </label>
              <input
                type="number"
                value={inputs.spotPrice}
                onChange={(e) => setInputs({ ...inputs, spotPrice: Number(e.target.value) })}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Strike Price
              </label>
              <input
                type="number"
                value={inputs.strikePrice}
                onChange={(e) => setInputs({ ...inputs, strikePrice: Number(e.target.value) })}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Time to Maturity (Years)
              </label>
              <input
                type="number"
                step="0.1"
                value={inputs.timeToMaturity}
                onChange={(e) => setInputs({ ...inputs, timeToMaturity: Number(e.target.value) })}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Volatility (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.volatility * 100}
                onChange={(e) => setInputs({ ...inputs, volatility: Number(e.target.value) / 100 })}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Risk-Free Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.riskFreeRate * 100}
                onChange={(e) => setInputs({ ...inputs, riskFreeRate: Number(e.target.value) / 100 })}
                className="w-full bg-gray-800/50 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Call Option Results */}
          <motion.div 
            className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10"
            {...fadeIn}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Call Option</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-400 mb-4">
              ${results.callPrice}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Delta</p>
                <p className="text-lg font-semibold">{results.callGreeks.delta}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Gamma</p>
                <p className="text-lg font-semibold">{results.callGreeks.gamma}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Theta</p>
                <p className="text-lg font-semibold">{results.callGreeks.theta}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Vega</p>
                <p className="text-lg font-semibold">{results.callGreeks.vega}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Rho</p>
                <p className="text-lg font-semibold">{results.callGreeks.rho}</p>
              </div>
            </div>
          </motion.div>

          {/* Put Option Results */}
          <motion.div 
            className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10"
            {...fadeIn}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Put Option</h3>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-3xl font-bold text-red-400 mb-4">
              ${results.putPrice}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Delta</p>
                <p className="text-lg font-semibold">{results.putGreeks.delta}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Gamma</p>
                <p className="text-lg font-semibold">{results.putGreeks.gamma}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Theta</p>
                <p className="text-lg font-semibold">{results.putGreeks.theta}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Vega</p>
                <p className="text-lg font-semibold">{results.putGreeks.vega}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Rho</p>
                <p className="text-lg font-semibold">{results.putGreeks.rho}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visualization Section */}
        <motion.div 
          className="backdrop-blur-xl bg-white/5 p-6 rounded-2xl border border-white/10"
          {...fadeIn}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Price Sensitivity</h3>
            <LineChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart
                data={[
                  { price: inputs.spotPrice * 0.8, call: results.callPrice * 0.5, put: results.putPrice * 1.5 },
                  { price: inputs.spotPrice * 0.9, call: results.callPrice * 0.75, put: results.putPrice * 1.25 },
                  { price: inputs.spotPrice, call: results.callPrice, put: results.putPrice },
                  { price: inputs.spotPrice * 1.1, call: results.callPrice * 1.25, put: results.putPrice * 0.75 },
                  { price: inputs.spotPrice * 1.2, call: results.callPrice * 1.5, put: results.putPrice * 0.5 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="price"
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
                  dataKey="call"
                  stroke="#34D399"
                  strokeWidth={2}
                  dot={{ fill: '#34D399' }}
                  name="Call Price"
                />
                <Line
                  type="monotone"
                  dataKey="put"
                  stroke="#F87171"
                  strokeWidth={2}
                  dot={{ fill: '#F87171' }}
                  name="Put Price"
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlackScholesComponent;