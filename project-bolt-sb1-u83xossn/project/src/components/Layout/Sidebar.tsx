import React from 'react';
import { BarChart3, Calculator, PieChart, Target, TrendingUp } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'portfolio', label: 'Portfolio', icon: PieChart },
    { id: 'sip', label: 'SIP Calculator', icon: Calculator },
    { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
    { id: 'goals', label: 'Goals', icon: Target },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-200">Navigation</h2>
      </div>
      
      <nav className="mt-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-800 transition-colors ${
                activeTab === tab.id ? 'bg-blue-600 border-r-4 border-blue-400' : ''
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;