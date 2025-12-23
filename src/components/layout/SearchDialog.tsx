/**
 * Search Dialog Component
 * Global search for recipes
 */

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, ChefHat, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { dummyRecipes } from '@/data/recipes';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Filter recipes based on search query
  const filteredRecipes = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return dummyRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm) ||
      recipe.description.toLowerCase().includes(searchTerm) ||
      recipe.category.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ing => ing.name.toLowerCase().includes(searchTerm))
    ).slice(0, 6); // Limit to 6 results
  }, [query]);

  const handleSelectRecipe = (recipeId: string) => {
    navigate(`/recipe/${recipeId}`);
    onOpenChange(false);
    setQuery('');
  };

  const handleClose = () => {
    onOpenChange(false);
    setQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="sr-only">Search Recipes</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes, ingredients..."
              className="pl-10 pr-10 h-12 text-base border-0 border-b rounded-none focus-visible:ring-0"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="max-h-80 overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-muted-foreground">
              <Search className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p>Start typing to search recipes...</p>
            </div>
          ) : filteredRecipes.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              <p>No recipes found for "{query}"</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredRecipes.map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => handleSelectRecipe(recipe.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{recipe.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {recipe.prepTime + recipe.cookTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <ChefHat className="h-3 w-3" />
                        {recipe.difficulty}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
