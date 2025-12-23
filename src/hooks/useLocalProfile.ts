/**
 * useLocalProfile Hook
 * Manages user profile data in localStorage
 */

import { useState, useEffect } from 'react';

export interface LocalProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  location: string;
}

const STORAGE_KEY = 'userProfile';

const defaultProfile: LocalProfile = {
  name: 'Guest User',
  email: 'guest@example.com',
  bio: 'Food enthusiast and home cook!',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  location: '',
};

export const useLocalProfile = () => {
  const [profile, setProfile] = useState<LocalProfile>(defaultProfile);

  // Load profile from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  }, []);

  // Save profile to localStorage
  const saveProfile = (newProfile: LocalProfile) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      setProfile(newProfile);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  // Reset profile to default
  const resetProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProfile(defaultProfile);
  };

  return {
    profile,
    saveProfile,
    resetProfile,
  };
};
