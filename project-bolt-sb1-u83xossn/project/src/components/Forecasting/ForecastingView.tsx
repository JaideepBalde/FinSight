import React, { useState } from 'react';
import { TrendingUp, Brain, BarChart3, AlertCircle } from 'lucide-react';
import ForecastChart from './ForecastChart';

const ForecastingView: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [selectedAsset, setSelectedAsset] = useState('portfolio');

  const periods = ['6M', '1Y', '2Y', '5Y'];
  const assets = [
    { value: 'portfolio', label: 'Overall Portfolio' },
    { value: 'stocks', label: 'Stocks' },
    { value: 'mutual_funds', label: 'Mutual Funds' },
  ];

  const predictions = {
    '6M': { return: 8.5, confidence: 78 },
    '1Y': { return: 12.3, confidence: 85 },
    '2Y': { return: 15.8, confidence: 72 },
    '5Y': { return: 14.2, confidence: 68 },
  };

  const currentPrediction = predictions[selectedPeriod as keyof typeof predictions];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">AI-Powered Forecasting</h1>
        <div className="flex items-center space-x-2 text-purple-600">
          <Brain className="h-5 w-5" />
          <span className="font-medium">Machine Learning Predictions</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Forecast Period
              </label>
              <div className="grid grid-cols-2 gap-2">
                {periods.map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedPeriod === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset Class
              </label>
              <select
                value={selectedAsset}
                onChange={(e) => setSelectedAsset(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {assets.map((asset) => (
                  <option key={asset.value} value={asset.value}>
                    {asset.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction Results</h3>
          
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Expected Return</span>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-bold text-green-900">
                    {currentPrediction.return}%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">Confidence Level</span>
                <span className="text-lg font-bold text-blue-900">
                  {currentPrediction.confidence}%
                </span>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Risk Level: {currentPrediction.confidence > 80 ? 'Low' : currentPrediction.confidence > 70 ? 'Medium' : 'High'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
          
          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-1">Market Trends</p>
              <p>Based on historical data and current market conditions, your portfolio shows positive growth potential.</p>
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="font-medium text-gray-900 mb-1">Recommendations</p>
              <ul className="space-y-1">
                <li>• Consider rebalancing if allocation differs by {'>'}5%</li>
                <li>• Monitor market volatility indicators</li>
                <li>• Maintain diversification across sectors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Forecast Visualization</h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm">Next {selectedPeriod}</span>
          </div>
        </div>
        <ForecastChart period={selectedPeriod} prediction={currentPrediction} />
      </div>
    </div>
  );
};

export default ForecastingView;