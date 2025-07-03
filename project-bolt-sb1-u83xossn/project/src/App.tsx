import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAuth } from './hooks/useAuth';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import DashboardView from './components/Dashboard/DashboardView';
import PortfolioView from './components/Portfolio/PortfolioView';
import SIPView from './components/SIP/SIPView';
import ForecastingView from './components/Forecasting/ForecastingView';
import GoalsView from './components/Goals/GoalsView';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">FinSight</h1>
            <p className="text-gray-600">AI-Powered Investment Tracker</p>
          </div>
          
          {isLoginForm ? (
            <LoginForm onToggleForm={() => setIsLoginForm(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLoginForm(true)} />
          )}
        </div>
      </div>
    );
  }

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'sip':
        return <SIPView />;
      case 'forecasting':
        return <ForecastingView />;
      case 'goals':
        return <GoalsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          {renderActiveComponent()}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;