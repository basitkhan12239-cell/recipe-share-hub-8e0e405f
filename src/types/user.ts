/**
 * User Types
 * TypeScript interfaces for user-related data structures
 */

// User profile information
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinedAt: string;
  recipesCount: number;
  followersCount: number;
  followingCount: number;
}

// Authentication state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration data
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Auth response from API
export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}
