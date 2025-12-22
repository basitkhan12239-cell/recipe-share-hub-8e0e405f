/**
 * Recipe Types
 * TypeScript interfaces for recipe-related data structures
 */

// Recipe categories available in the app
export type RecipeCategory = 
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'desserts'
  | 'vegetarian'
  | 'quick-meals'
  | 'appetizers'
  | 'soups'
  | 'salads'
  | 'beverages';

// Difficulty levels for recipes
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// Single ingredient in a recipe
export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

// Single instruction step
export interface InstructionStep {
  stepNumber: number;
  instruction: string;
  duration?: number; // Optional duration in minutes
}

// Nutrition information
export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

// Review/Rating for a recipe
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

// Main Recipe interface
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: RecipeCategory;
  difficulty: DifficultyLevel;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  nutrition?: NutritionInfo;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  rating: number; // Average rating
  reviewCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Recipe card props (simplified version for listing)
export interface RecipeCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: RecipeCategory;
  difficulty: DifficultyLevel;
  prepTime: number;
  cookTime: number;
  rating: number;
  reviewCount: number;
  authorName: string;
  authorAvatar?: string;
}

// Recipe form data for submission
export interface RecipeFormData {
  title: string;
  description: string;
  image: File | null;
  category: RecipeCategory;
  difficulty: DifficultyLevel;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Omit<Ingredient, 'id'>[];
  instructions: string[];
  tags: string[];
}

// Category display data
export interface CategoryInfo {
  id: RecipeCategory;
  name: string;
  description: string;
  icon: string;
  recipeCount: number;
  color: string;
}

// Filter options for recipe listing
export interface RecipeFilters {
  category?: RecipeCategory;
  difficulty?: DifficultyLevel;
  maxCookTime?: number;
  minRating?: number;
  searchQuery?: string;
}

// Pagination info
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationInfo;
}
