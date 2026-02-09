/**
 * Recipe API Service
 * API calls related to recipes
 * Currently uses dummy data, ready to connect to MERN backend
 */

import { apiClient } from './config';
import { Recipe, RecipeFilters, ApiResponse, RecipeFormData } from '@/types';
import { dummyRecipes } from '@/data/recipes';

// Flag to use dummy data (set to false when backend is ready)
const USE_DUMMY_DATA = true;

/**
 * Get all recipes with optional filters
 */
export const getRecipes = async (
  filters?: RecipeFilters,
  page: number = 1,
  limit: number = 12
): Promise<ApiResponse<Recipe[]>> => {
  if (USE_DUMMY_DATA) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredRecipes = [...dummyRecipes];
    
    // Apply filters
    if (filters?.category) {
      filteredRecipes = filteredRecipes.filter(r => r.category === filters.category);
    }
    if (filters?.difficulty) {
      filteredRecipes = filteredRecipes.filter(r => r.difficulty === filters.difficulty);
    }
    if (filters?.maxCookTime) {
      filteredRecipes = filteredRecipes.filter(r => (r.prepTime + r.cookTime) <= filters.maxCookTime!);
    }
    if (filters?.minRating) {
      filteredRecipes = filteredRecipes.filter(r => r.rating >= filters.minRating!);
    }
    if (filters?.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filteredRecipes = filteredRecipes.filter(r => 
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + limit);
    
    return {
      success: true,
      data: paginatedRecipes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filteredRecipes.length / limit),
        totalItems: filteredRecipes.length,
        itemsPerPage: limit,
      },
    };
  }
  
  // Real API call (when backend is ready)
  const response = await apiClient.get('/recipes', {
    params: { ...filters, page, limit },
  });
  return response.data;
};

/**
 * Get a single recipe by ID
 */
export const getRecipeById = async (id: string): Promise<ApiResponse<Recipe>> => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const recipe = dummyRecipes.find(r => r.id === id);
    
    if (!recipe) {
      return { success: false, data: null as unknown as Recipe, message: 'Recipe not found' };
    }
    
    return { success: true, data: recipe };
  }
  
  const response = await apiClient.get(`/recipes/${id}`);
  return response.data;
};

/**
 * Get featured recipes for homepage
 */
export const getFeaturedRecipes = async (): Promise<ApiResponse<Recipe[]>> => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const featured = dummyRecipes.filter(r => r.isFeatured).slice(0, 4);
    return { success: true, data: featured };
  }
  
  const response = await apiClient.get('/recipes/featured');
  return response.data;
};

/**
 * Get trending recipes for homepage
 */
export const getTrendingRecipes = async (): Promise<ApiResponse<Recipe[]>> => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const trending = dummyRecipes.filter(r => r.isTrending).slice(0, 8);
    return { success: true, data: trending };
  }
  
  const response = await apiClient.get('/recipes/trending');
  return response.data;
};

/**
 * Submit a new recipe
 */
export const submitRecipe = async (recipeData: RecipeFormData): Promise<ApiResponse<Recipe>> => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Simulate successful submission
    console.log('Recipe submitted (dummy):', recipeData);
    
    // Create a proper Recipe object from form data
    const newRecipe: Recipe = {
      ...dummyRecipes[0],
      id: 'new-recipe-id',
      title: recipeData.title,
      description: recipeData.description,
      image: recipeData.image ? URL.createObjectURL(recipeData.image) : dummyRecipes[0].image,
      category: recipeData.category,
      difficulty: recipeData.difficulty,
      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      servings: recipeData.servings,
      tags: recipeData.tags,
      ingredients: recipeData.ingredients.map((ing, idx) => ({ ...ing, id: `ing-${idx}` })),
      instructions: recipeData.instructions.map((inst, idx) => ({ stepNumber: idx + 1, instruction: inst })),
    };
    
    return { 
      success: true, 
      data: newRecipe,
      message: 'Recipe submitted successfully!' 
    };
  }
  
  // For real API, you'd use FormData for image upload
  const formData = new FormData();
  Object.entries(recipeData).forEach(([key, value]) => {
    if (key === 'image' && value) {
      formData.append('image', value as File);
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });
  
  const response = await apiClient.post('/recipes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * Get recipes by a specific user
 */
export const getUserRecipes = async (userId: string): Promise<ApiResponse<Recipe[]>> => {
  if (USE_DUMMY_DATA) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const userRecipes = dummyRecipes.filter(r => r.authorId === userId);
    return { success: true, data: userRecipes };
  }
  
  const response = await apiClient.get(`/recipes/user/${userId}`);
  return response.data;
};
