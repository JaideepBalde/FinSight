import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import StatsCard from './StatsCard';
import PortfolioChart from './PortfolioChart';
import { DollarSign, TrendingUp, Target, PieChart, Activity } from 'lucide-react';

const DashboardView: React.FC = () => {
  const { totalValue, totalInvestment, totalGainLoss, totalGainLossPercent, investments } = useSelector(
    (state: RootState) => state.portfolio
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate portfolio diversity
  const portfolioDiversity = investments.length > 0 ? 
    new Set(investments.map(inv => inv.type)).size : 0;

  // Recent transactions (mock data for demo)
  const recentTransactions = [
    { name: 'HDFC Bank', amount: 5000, type: 'buy', date: '2024-01-15' },
    { name: 'SBI Bluechip Fund', amount: 3000, type: 'buy', date: '2024-01-12' },
    { name: 'Reliance Industries', amount: 2000, type: 'buy', date: '2024-01-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your portfolio overview.</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Portfolio Value"
          value={formatCurrency(totalValue || 0)}
          change={totalValue > 0 ? `${totalGainLossPercent.toFixed(1)}% total return` : "Start investing"}
          changeType={totalGainLoss >= 0 ? "positive" : "negative"}
          icon={DollarSign}
        />
        <StatsCard
          title="Total Investment"
          value={formatCurrency(totalInvestment || 0)}
          change={investments.length > 0 ? `${investments.length} holdings` : "No investments yet"}
          changeType="neutral"
          icon={PieChart}
        />
        <StatsCard
          title="Total Gains/Loss"
          value={formatCurrency(totalGainLoss || 0)}
          change={totalGainLoss >= 0 ? "Profitable portfolio" : "Portfolio in loss"}
          changeType={totalGainLoss >= 0 ? "positive" : "negative"}
          icon={TrendingUp}
        />
        <StatsCard
          title="Portfolio Diversity"
          value={`${portfolioDiversity} ${portfolioDiversity === 1 ? 'Type' : 'Types'}`}
          change={portfolioDiversity > 1 ? "Well diversified" : "Consider diversifying"}
          changeType={portfolioDiversity > 1 ? "positive" : "neutral"}
          icon={Activity}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PortfolioChart />
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <div className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Add Investment</span>
                </div>
                <p className="text-sm text-blue-700 mt-1">Expand your portfolio</p>
              </button>
              
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Set Goal</span>
                </div>
                <p className="text-sm text-green-700 mt-1">Plan your future</p>
              </button>
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Portfolio Insights</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Best Performer:</span>
                  <span className="font-medium text-green-600">
                    {investments.length > 0 ? 
                      investments.reduce((best, inv) => 
                        inv.gainLossPercent > best.gainLossPercent ? inv : best
                      ).name : 'N/A'
                    }
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Holdings:</span>
                  <span className="font-medium text-gray-900">{investments.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Asset Types:</span>
                  <span className="font-medium text-gray-900">{portfolioDiversity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {investments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Holdings</h3>
          <div className="space-y-3">
            {investments.slice(0, 5).map((investment, index) => (
              <div key={investment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{investment.name}</p>
                    <p className="text-sm text-gray-600">{investment.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(investment.currentValue)}
                  </p>
                  <p className={`text-sm ${
                    investment.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {investment.gainLoss >= 0 ? '+' : ''}{investment.gainLossPercent.toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;