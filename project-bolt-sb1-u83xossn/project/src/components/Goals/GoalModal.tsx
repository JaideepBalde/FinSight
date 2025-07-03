import React, { useState, useEffect } from 'react';
import { X, Target } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  description: string;
  category: string;
}

interface GoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: Goal | Omit<Goal, 'id'>) => void;
  goal?: Goal | null;
}

const GoalModal: React.FC<GoalModalProps> = ({ isOpen, onClose, onSave, goal }) => {
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    description: '',
    category: 'General',
  });

  const categories = ['General', 'Emergency', 'Real Estate', 'Education', 'Retirement', 'Travel', 'Investment'];

  useEffect(() => {
    if (goal) {
      setFormData({
        title: goal.title,
        targetAmount: goal.targetAmount.toString(),
        currentAmount: goal.currentAmount.toString(),
        targetDate: goal.targetDate,
        description: goal.description,
        category: goal.category,
      });
    } else {
      setFormData({
        title: '',
        targetAmount: '',
        currentAmount: '',
        targetDate: '',
        description: '',
        category: 'General',
      });
    }
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const goalData = {
      title: formData.title,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      targetDate: formData.targetDate,
      description: formData.description,
      category: formData.category,
    };

    if (goal) {
      onSave({ ...goalData, id: goal.id });
    } else {
      onSave(goalData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">
              {goal ? 'Edit Goal' : 'Add New Goal'}
            </h2>
          </div>
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
              Goal Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Emergency Fund"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target Amount (₹)
              </label>
              <input
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="500000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Amount (₹)
              </label>
              <input
                type="number"
                value={formData.currentAmount}
                onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="125000"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Target Date
            </label>
            <input
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Brief description of your goal..."
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
              {goal ? 'Update Goal' : 'Add Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoalModal;