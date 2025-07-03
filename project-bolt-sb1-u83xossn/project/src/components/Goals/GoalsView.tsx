import React, { useState } from 'react';
import { Target, Plus, Edit, Trash2, Calendar } from 'lucide-react';
import GoalModal from './GoalModal';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  description: string;
  category: string;
}

const GoalsView: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 500000,
      currentAmount: 125000,
      targetDate: '2024-12-31',
      description: '6 months of expenses',
      category: 'Emergency',
    },
    {
      id: '2',
      title: 'House Down Payment',
      targetAmount: 2000000,
      currentAmount: 400000,
      targetDate: '2026-06-30',
      description: 'Down payment for dream home',
      category: 'Real Estate',
    },
    {
      id: '3',
      title: 'Retirement Fund',
      targetAmount: 10000000,
      currentAmount: 850000,
      targetDate: '2045-12-31',
      description: 'Comfortable retirement',
      category: 'Retirement',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals([...goals, newGoal]);
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const openEditModal = (goal: Goal) => {
    setEditingGoal(goal);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingGoal(null);
    setShowModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Goal</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const daysRemaining = getDaysRemaining(goal.targetDate);
          
          return (
            <div key={goal.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => openEditModal(goal)}
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{progress.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(goal.currentAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Target</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(goal.targetAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining</span>
                    <span className="text-sm font-medium text-red-600">
                      {formatCurrency(goal.targetAmount - goal.currentAmount)}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
                      </span>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {goal.category}
                    </span>
                  </div>
                </div>

                {goal.description && (
                  <p className="text-sm text-gray-600 italic">{goal.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <GoalModal
        isOpen={showModal}
        onClose={closeModal}
        onSave={editingGoal ? handleUpdateGoal : handleAddGoal}
        goal={editingGoal}
      />
    </div>
  );
};

export default GoalsView;