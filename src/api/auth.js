/**
 * Authentication API Service
 * API calls related to user authentication
 * Currently uses dummy data, ready to connect to MERN backend
 */

import { apiClient } from './config';

// Flag to use dummy data (set to false when backend is ready)
const USE_DUMMY_DATA = true;

// Dummy user for testing
const dummyUser = {
  id: 'user-1',
  name: 'John Chef',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  bio: 'Passionate home cook sharing delicious recipes',
  location: 'New York, USA',
  joinedAt: '2024-01-15',
  recipesCount: 12,
  followersCount: 245,
  followingCount: 89,
};

/**
 * Login user
 */
export const login = async (credentials) => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate login validation
    if (credentials.email && credentials.password) {
      return {
        success: true,
        user: dummyUser,
        token: 'dummy-jwt-token-12345',
        message: 'Login successful!',
      };
    }
    
    return {
      success: false,
      user: null,
      token: '',
      message: 'Invalid credentials',
    };
  }
  
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

/**
 * Register new user
 */
export const register = async (data) => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate registration
    if (data.email && data.password === data.confirmPassword) {
      return {
        success: true,
        user: { ...dummyUser, name: data.name, email: data.email },
        token: 'dummy-jwt-token-new-user',
        message: 'Registration successful!',
      };
    }
    
    return {
      success: false,
      user: null,
      token: '',
      message: 'Registration failed',
    };
  }
  
  const response = await apiClient.post('/auth/register', data);
  return response.data;
};

/**
 * Logout user
 */
export const logout = async () => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { success: true };
  }
  
  const response = await apiClient.post('/auth/logout');
  return response.data;
};

/**
 * Get current user profile
 */
export const getCurrentUser = async () => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const token = localStorage.getItem('authToken');
    
    if (token) {
      return { success: true, user: dummyUser };
    }
    
    return { success: false, user: null };
  }
  
  const response = await apiClient.get('/auth/me');
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (data) => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, user: { ...dummyUser, ...data } };
  }
  
  const response = await apiClient.put('/auth/profile', data);
  return response.data;
};
