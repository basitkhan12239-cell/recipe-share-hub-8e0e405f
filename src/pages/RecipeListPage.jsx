/**
 * Recipe List Page
 * Browse all recipes with filters and pagination
 */

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Layout } from '@/components/layout';
import { RecipeCard, SearchBar } from '@/components/recipes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getRecipes } from '@/api/recipes';

const RecipeListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Get filter values from URL params
  const currentFilters = {
    category: searchParams.get('category') || undefined,
    difficulty: searchParams.get('difficulty') || undefined,
    maxCookTime: searchParams.get('maxCookTime') ? parseInt(searchParams.get('maxCookTime')) : undefined,
    searchQuery: searchParams.get('q') || undefined,
  };

  const currentPage = parseInt(searchParams.get('page') || '1');

  // Category options
  const categoryOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'desserts', label: 'Desserts' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'quick-meals', label: 'Quick Meals' },
  ];

  // Time filter options
  const timeOptions = [
    { value: '30', label: 'Under 30 min' },
    { value: '60', label: 'Under 1 hour' },
    { value: '120', label: 'Under 2 hours' },
  ];

  // Difficulty options
  const difficultyOptions = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  // Fetch recipes when filters or page change
  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const response = await getRecipes(currentFilters, currentPage, 12);
        if (response.success) {
          setRecipes(response.data);
          setPagination(response.pagination || null);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [searchParams]);

  // Update filter in URL
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to first page on filter change
    setSearchParams(newParams);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({});
  };

  // Handle search
  const handleSearch = (query) => {
    updateFilter('q', query || undefined);
  };

  // Convert Recipe to RecipeCardData
  const toCardData = (recipe) => ({
    id: recipe.id,
    title: recipe.title,
    description: recipe.description,
    image: recipe.image,
    category: recipe.category,
    difficulty: recipe.difficulty,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    rating: recipe.rating,
    reviewCount: recipe.reviewCount,
    authorName: recipe.authorName,
    authorAvatar: recipe.authorAvatar,
  });

  // Check if any filters are active
  const hasActiveFilters = Object.values(currentFilters).some(v => v !== undefined);

  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-coral-light/50 to-background py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground text-center mb-4">
            Browse Recipes
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
            Discover delicious recipes from our community of passionate cooks
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              {/* Toggle Filters Button (Mobile) */}
              <Button
                variant="outline"
                className="lg:hidden gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>

              {/* Desktop Filters */}
              <div className={`flex flex-wrap items-center gap-3 ${showFilters ? 'flex' : 'hidden lg:flex'} w-full lg:w-auto`}>
                {/* Category Filter */}
                <Select
                  value={currentFilters.category || ''}
                  onValueChange={(value) => updateFilter('category', value || undefined)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Time Filter */}
                <Select
                  value={currentFilters.maxCookTime?.toString() || ''}
                  onValueChange={(value) => updateFilter('maxCookTime', value || undefined)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Cook Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Difficulty Filter */}
                <Select
                  value={currentFilters.difficulty || ''}
                  onValueChange={(value) => updateFilter('difficulty', value || undefined)}
                >
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>
            </div>

            {/* Results Count */}
            {pagination && (
              <p className="text-sm text-muted-foreground">
                Showing {recipes.length} of {pagination.totalItems} recipes
              </p>
            )}
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {currentFilters.category && (
                <Badge variant="secondary" className="gap-1">
                  {categoryOptions.find(c => c.value === currentFilters.category)?.label}
                  <button onClick={() => updateFilter('category', undefined)}>&times;</button>
                </Badge>
              )}
              {currentFilters.maxCookTime && (
                <Badge variant="secondary" className="gap-1">
                  Under {currentFilters.maxCookTime} min
                  <button onClick={() => updateFilter('maxCookTime', undefined)}>&times;</button>
                </Badge>
              )}
              {currentFilters.difficulty && (
                <Badge variant="secondary" className="gap-1">
                  {currentFilters.difficulty}
                  <button onClick={() => updateFilter('difficulty', undefined)}>&times;</button>
                </Badge>
              )}
              {currentFilters.searchQuery && (
                <Badge variant="secondary" className="gap-1">
                  "{currentFilters.searchQuery}"
                  <button onClick={() => updateFilter('q', undefined)}>&times;</button>
                </Badge>
              )}
            </div>
          )}

          {/* Recipes Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden shadow-card-md animate-pulse">
                  <div className="aspect-[4/3] bg-muted" />
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={toCardData(recipe)} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">No recipes found matching your criteria.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                onClick={() => updateFilter('page', String(currentPage - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => updateFilter('page', String(page))}
                >
                  {page}
                </Button>
              ))}

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= pagination.totalPages}
                onClick={() => updateFilter('page', String(currentPage + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default RecipeListPage;