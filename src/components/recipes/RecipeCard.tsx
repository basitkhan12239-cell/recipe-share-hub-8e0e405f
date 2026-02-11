/**
 * RecipeCard Component
 * Displays a recipe preview in grid/list views
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { RecipeCardData, RecipeCategory } from '@/types';
import { useSavedRecipes } from '@/context';
import { Badge } from '@/components/ui/badge';

interface RecipeCardProps {
  recipe: RecipeCardData;
}

// Category color mapping
const categoryColors: Record<RecipeCategory, string> = {
  breakfast: 'bg-category-breakfast/20 text-category-breakfast',
  lunch: 'bg-category-lunch/20 text-category-lunch',
  dinner: 'bg-category-dinner/20 text-category-dinner',
  desserts: 'bg-category-desserts/20 text-category-desserts',
  vegetarian: 'bg-category-vegetarian/20 text-category-vegetarian',
  'quick-meals': 'bg-category-quick/20 text-category-quick',
  appetizers: 'bg-primary/20 text-primary',
  soups: 'bg-sage/20 text-sage',
  salads: 'bg-category-vegetarian/20 text-category-vegetarian',
  beverages: 'bg-category-quick/20 text-category-quick',
};

// Category display names
const categoryNames: Record<RecipeCategory, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  desserts: 'Desserts',
  vegetarian: 'Vegetarian',
  'quick-meals': 'Quick Meals',
  appetizers: 'Appetizers',
  soups: 'Soups',
  salads: 'Salads',
  beverages: 'Beverages',
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { isRecipeSaved, toggleSaveRecipe } = useSavedRecipes();
  const isSaved = isRecipeSaved(recipe.id);
  const totalTime = recipe.prepTime + recipe.cookTime;

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveRecipe(recipe.id);
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="block group">
      <article className="recipe-card bg-card rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(249,115,22,0.15)] hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)] transition-shadow duration-300">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${categoryColors[recipe.category]} border-0 font-medium`}>
              {categoryNames[recipe.category]}
            </Badge>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
              isSaved 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card/80 text-foreground hover:bg-card'
            }`}
            aria-label={isSaved ? 'Unsave recipe' : 'Save recipe'}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </button>

          {/* Gradient Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-foreground/60 to-transparent" />
          
          {/* Time Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-primary-foreground text-sm font-medium">
            <Clock className="h-4 w-4" />
            <span>{totalTime} min</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {recipe.description}
          </p>

          {/* Meta Info */}
          <div className="mt-4 flex items-center justify-between">
            {/* Author */}
            <div className="flex items-center gap-2">
              {recipe.authorAvatar && (
                <img
                  src={recipe.authorAvatar}
                  alt={recipe.authorName}
                  className="h-6 w-6 rounded-full object-cover"
                />
              )}
              <span className="text-sm text-muted-foreground">{recipe.authorName}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-category-breakfast text-category-breakfast" />
              <span className="text-sm font-medium text-card-foreground">{recipe.rating}</span>
              <span className="text-sm text-muted-foreground">({recipe.reviewCount})</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default RecipeCard;
