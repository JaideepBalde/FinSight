import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Info } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('demo@finsight.com');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleDemoLogin = () => {
    setEmail('demo@finsight.com');
    setPassword('demo123');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Welcome Back</h2>
      
      {/* Demo credentials info */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Demo Credentials</p>
            <p className="text-sm text-blue-700">Email: demo@finsight.com</p>
            <p className="text-sm text-blue-700">Password: demo123</p>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Use demo credentials
            </button>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-gray-600">Don't have an account? </span>
        <button
          onClick={onToggleForm}
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;