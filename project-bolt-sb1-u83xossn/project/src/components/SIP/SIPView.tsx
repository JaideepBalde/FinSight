import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { calculateSIP, savePlan } from '../../store/slices/sipSlice';
import { Calculator, Save, TrendingUp } from 'lucide-react';
import SIPChart from './SIPChart';

const SIPView: React.FC = () => {
  const [formData, setFormData] = useState({
    monthlyInvestment: 10000,
    expectedReturn: 12,
    timePeriod: 10,
  });

  const dispatch = useDispatch();
  const { currentCalculation } = useSelector((state: RootState) => state.sip);

  const handleCalculate = () => {
    dispatch(calculateSIP(formData));
  };

  const handleSavePlan = () => {
    if (currentCalculation) {
      dispatch(savePlan(currentCalculation));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">SIP Calculator</h1>
        <div className="flex items-center space-x-2 text-blue-600">
          <Calculator className="h-5 w-5" />
          <span className="font-medium">Plan Your Investments</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Parameters</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Investment (₹)
              </label>
              <input
                type="number"
                value={formData.monthlyInvestment}
                onChange={(e) => setFormData({ ...formData, monthlyInvestment: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="500"
                step="500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Annual Return (%)
              </label>
              <input
                type="number"
                value={formData.expectedReturn}
                onChange={(e) => setFormData({ ...formData, expectedReturn: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="30"
                step="0.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Investment Period (Years)
              </label>
              <input
                type="number"
                value={formData.timePeriod}
                onChange={(e) => setFormData({ ...formData, timePeriod: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="50"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={handleCalculate}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Calculator className="h-4 w-4" />
                <span>Calculate</span>
              </button>
              
              {currentCalculation && (
                <button
                  onClick={handleSavePlan}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Plan</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
          
          {currentCalculation ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">Total Investment</span>
                    <span className="text-lg font-bold text-blue-900">
                      {formatCurrency(currentCalculation.totalInvestment)}
                    </span>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-700">Estimated Returns</span>
                    <span className="text-lg font-bold text-green-900">
                      {formatCurrency(currentCalculation.estimatedReturns)}
                    </span>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-700">Total Value</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-purple-700" />
                      <span className="text-lg font-bold text-purple-900">
                        {formatCurrency(currentCalculation.totalValue)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Your investment will grow {(currentCalculation.totalValue / currentCalculation.totalInvestment).toFixed(1)}x in {currentCalculation.timePeriod} years</li>
                  <li>• Monthly SIP of ₹{currentCalculation.monthlyInvestment.toLocaleString()} for {currentCalculation.timePeriod} years</li>
                  <li>• Expected annual return of {currentCalculation.expectedReturn}%</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Enter your investment parameters and click Calculate to see results</p>
            </div>
          )}
        </div>
      </div>

      {currentCalculation && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Projection</h3>
          <SIPChart data={currentCalculation.yearlyData} />
        </div>
      )}
    </div>
  );
};

export default SIPView;