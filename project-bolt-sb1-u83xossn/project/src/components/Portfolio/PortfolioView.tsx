import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addInvestment, removeInvestment, setInvestments } from '../../store/slices/portfolioSlice';
import { Plus, Trash2, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import AddInvestmentModal from './AddInvestmentModal';

const PortfolioView: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const { investments, totalValue, totalInvestment, totalGainLoss, totalGainLossPercent } = useSelector(
    (state: RootState) => state.portfolio
  );
  const dispatch = useDispatch();

  // Initialize with sample data if no investments exist
  useEffect(() => {
    if (investments.length === 0) {
      const sampleInvestments = [
        {
          id: '1',
          name: 'HDFC Bank',
          symbol: 'HDFCBANK',
          amount: 50000,
          units: 35,
          price: 1428.57,
          date: '2024-01-15',
          type: 'stocks' as const,
          currentValue: 55000,
          gainLoss: 5000,
          gainLossPercent: 10,
        },
        {
          id: '2',
          name: 'SBI Bluechip Fund',
          symbol: 'SBIBCF',
          amount: 30000,
          units: 500,
          price: 60,
          date: '2024-01-10',
          type: 'mutual_funds' as const,
          currentValue: 32000,
          gainLoss: 2000,
          gainLossPercent: 6.67,
        },
        {
          id: '3',
          name: 'Reliance Industries',
          symbol: 'RELIANCE',
          amount: 25000,
          units: 10,
          price: 2500,
          date: '2024-01-05',
          type: 'stocks' as const,
          currentValue: 26500,
          gainLoss: 1500,
          gainLossPercent: 6,
        },
      ];
      dispatch(setInvestments(sampleInvestments));
    }
  }, [investments.length, dispatch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleRemoveInvestment = (id: string) => {
    if (window.confirm('Are you sure you want to remove this investment?')) {
      dispatch(removeInvestment(id));
    }
  };

  const handleRefreshPrices = () => {
    // Simulate price updates
    const updatedInvestments = investments.map(inv => {
      const priceChange = (Math.random() - 0.5) * 0.1; // ±5% change
      const newCurrentValue = inv.amount * (1 + priceChange);
      const newGainLoss = newCurrentValue - inv.amount;
      const newGainLossPercent = (newGainLoss / inv.amount) * 100;
      
      return {
        ...inv,
        currentValue: newCurrentValue,
        gainLoss: newGainLoss,
        gainLossPercent: newGainLossPercent,
      };
    });
    
    dispatch(setInvestments(updatedInvestments));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleRefreshPrices}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Prices</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Investment</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Value</h3>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalValue)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Investment</h3>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInvestment)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Gains</h3>
          <div className="flex items-center space-x-2">
            <p className={`text-2xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totalGainLoss)}
            </p>
            <div className={`flex items-center ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalGainLoss >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              <span className="text-sm font-medium">{totalGainLossPercent.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Holdings</h3>
        </div>
        {investments.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <TrendingUp className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No investments yet</h3>
            <p className="text-gray-600 mb-4">Start building your portfolio by adding your first investment.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Investment
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Investment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    P&L
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {investments.map((investment) => (
                  <tr key={investment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{investment.name}</div>
                        <div className="text-sm text-gray-500">{investment.symbol}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {investment.units}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{investment.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(investment.currentValue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-1">
                        {investment.gainLoss >= 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                        <span className={`text-sm font-medium ${
                          investment.gainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {formatCurrency(investment.gainLoss)} ({investment.gainLossPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleRemoveInvestment(investment.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddInvestmentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(investment) => {
          dispatch(addInvestment(investment));
          setShowAddModal(false);
        }}
      />
    </div>
  );
};

export default PortfolioView;