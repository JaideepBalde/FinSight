import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError, clearError } from '../store/slices/authSlice';
import { RootState } from '../store';

// Mock user data for demo purposes
const DEMO_USERS = [
  { email: 'demo@finsight.com', password: 'demo123', name: 'Demo User' },
  { email: 'test@example.com', password: 'test123', name: 'Test User' }
];

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('finsight_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch(setUser(userData));
      } catch (error) {
        localStorage.removeItem('finsight_user');
      }
    }
    dispatch(setLoading(false));
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check demo credentials
      const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password);
      
      if (demoUser) {
        const userData = {
          uid: `demo_${Date.now()}`,
          email: demoUser.email,
          displayName: demoUser.name,
        };
        
        // Save to localStorage for persistence
        localStorage.setItem('finsight_user', JSON.stringify(userData));
        dispatch(setUser(userData));
      } else {
        throw new Error('Invalid email or password. Try demo@finsight.com / demo123');
      }
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const register = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      dispatch(clearError());
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUser = DEMO_USERS.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User already exists. Please login instead.');
      }
      
      // Create new user
      const userData = {
        uid: `user_${Date.now()}`,
        email: email,
        displayName: email.split('@')[0],
      };
      
      // Save to localStorage for persistence
      localStorage.setItem('finsight_user', JSON.stringify(userData));
      dispatch(setUser(userData));
    } catch (error: any) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('finsight_user');
      dispatch(setUser(null));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  return { user, loading, error, login, register, logout };
};