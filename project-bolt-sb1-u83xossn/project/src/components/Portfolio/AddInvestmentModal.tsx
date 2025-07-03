import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Investment {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  units: number;
  price: number;
  date: string;
  type: 'stocks' | 'mutual_funds' | 'bonds';
  currentValue: number;
  gainLoss: number;
  gainLossPercent: number;
}

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (investment: Investment) => void;
}

const AddInvestmentModal: React.FC<AddInvestmentModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    amount: '',
    units: '',
    price: '',
    type: 'stocks' as const,
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    const units = parseFloat(formData.units);
    const price = parseFloat(formData.price);
    
    // Simulate current value with some random fluctuation
    const currentValue = amount * (1 + (Math.random() - 0.5) * 0.2);
    const gainLoss = currentValue - amount;
    const gainLossPercent = (gainLoss / amount) * 100;
    
    const investment: Investment = {
      id: Date.now().toString(),
      name: formData.name,
      symbol: formData.symbol,
      amount,
      units,
      price,
      date: formData.date,
      type: formData.type,
      currentValue,
      gainLoss,
      gainLossPercent,
    };

    onAdd(investment);
    setFormData({
      name: '',
      symbol: '',
      amount: '',
      units: '',
      price: '',
      type: 'stocks',
      date: new Date().toISOString().split('T')[0],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Add Investment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., HDFC Bank"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symbol
            </label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., HDFCBANK"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'stocks' | 'mutual_funds' | 'bonds' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="stocks">Stocks</option>
              <option value="mutual_funds">Mutual Funds</option>
              <option value="bonds">Bonds</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (₹)
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="50000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Units
              </label>
              <input
                type="number"
                value={formData.units}
                onChange={(e) => setFormData({ ...formData, units: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="35"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purchase Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInvestmentModal;