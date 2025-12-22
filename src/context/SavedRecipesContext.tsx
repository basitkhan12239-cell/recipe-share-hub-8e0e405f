/**
 * Saved Recipes Context
 * Manages bookmarked/saved recipes state
 * Uses localStorage for persistence (can be replaced with API calls)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Context type definition
interface SavedRecipesContextType {
  savedRecipes: string[]; // Array of recipe IDs
  saveRecipe: (recipeId: string) => void;
  unsaveRecipe: (recipeId: string) => void;
  isRecipeSaved: (recipeId: string) => boolean;
  toggleSaveRecipe: (recipeId: string) => void;
}

// Create the context
const SavedRecipesContext = createContext<SavedRecipesContextType | undefined>(undefined);

// Local storage key
const STORAGE_KEY = 'savedRecipes';

// Provider props
interface SavedRecipesProviderProps {
  children: ReactNode;
}

/**
 * SavedRecipesProvider Component
 * Manages saved recipes state with localStorage persistence
 */
export const SavedRecipesProvider: React.FC<SavedRecipesProviderProps> = ({ children }) => {
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  // Load saved recipes from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedRecipes(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading saved recipes:', error);
    }
  }, []);

  // Save to localStorage whenever savedRecipes changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRecipes));
    } catch (error) {
      console.error('Error saving recipes:', error);
    }
  }, [savedRecipes]);

  /**
   * Save a recipe by ID
   */
  const saveRecipe = (recipeId: string): void => {
    setSavedRecipes(prev => {
      if (prev.includes(recipeId)) return prev;
      return [...prev, recipeId];
    });
  };

  /**
   * Unsave (remove) a recipe by ID
   */
  const unsaveRecipe = (recipeId: string): void => {
    setSavedRecipes(prev => prev.filter(id => id !== recipeId));
  };

  /**
   * Check if a recipe is saved
   */
  const isRecipeSaved = (recipeId: string): boolean => {
    return savedRecipes.includes(recipeId);
  };

  /**
   * Toggle save status of a recipe
   */
  const toggleSaveRecipe = (recipeId: string): void => {
    if (isRecipeSaved(recipeId)) {
      unsaveRecipe(recipeId);
    } else {
      saveRecipe(recipeId);
    }
  };

  const value: SavedRecipesContextType = {
    savedRecipes,
    saveRecipe,
    unsaveRecipe,
    isRecipeSaved,
    toggleSaveRecipe,
  };

  return (
    <SavedRecipesContext.Provider value={value}>
      {children}
    </SavedRecipesContext.Provider>
  );
};

/**
 * Custom hook to use saved recipes context
 */
export const useSavedRecipes = (): SavedRecipesContextType => {
  const context = useContext(SavedRecipesContext);
  
  if (context === undefined) {
    throw new Error('useSavedRecipes must be used within a SavedRecipesProvider');
  }
  
  return context;
};

export default SavedRecipesContext;
