/**
 * Authentication Context
 * Manages user authentication state across the app
 * Ready to connect with MERN backend
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getCurrentUser } from '@/api/auth';

// Create the context
const AuthContext = createContext(undefined);

/**
 * AuthProvider Component
 * Wraps the app and provides authentication state
 */
export const AuthProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      
      if (token) {
        try {
          const response = await getCurrentUser();
          if (response.success && response.user) {
            setState({
              user: response.user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
            return;
          }
        } catch (error) {
          localStorage.removeItem('authToken');
        }
      }
      
      setState(prev => ({ ...prev, isLoading: false }));
    };

    checkAuth();
  }, []);

  /**
   * Login function
   */
  const login = async (credentials) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await apiLogin(credentials);
      
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        setState({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Login failed',
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An error occurred during login',
      }));
      return false;
    }
  };

  /**
   * Register function
   */
  const register = async (data) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await apiRegister(data);
      
      if (response.success) {
        localStorage.setItem('authToken', response.token);
        setState({
          user: response.user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        return true;
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: response.message || 'Registration failed',
        }));
        return false;
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'An error occurred during registration',
      }));
      return false;
    }
  };

  /**
   * Logout function
   */
  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      localStorage.removeItem('authToken');
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    }
  };

  /**
   * Clear error message
   */
  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;
