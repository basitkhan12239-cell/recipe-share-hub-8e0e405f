/**
 * CategoryCard Component
 * Displays a recipe category with icon and count
 */

import React from 'react';
import { Link } from 'react-router-dom';

// Background color mapping for categories
const categoryBgColors = {
  breakfast: 'bg-category-breakfast/10 hover:bg-category-breakfast/20 border-category-breakfast/30',
  lunch: 'bg-category-lunch/10 hover:bg-category-lunch/20 border-category-lunch/30',
  dinner: 'bg-category-dinner/10 hover:bg-category-dinner/20 border-category-dinner/30',
  desserts: 'bg-category-desserts/10 hover:bg-category-desserts/20 border-category-desserts/30',
  vegetarian: 'bg-category-vegetarian/10 hover:bg-category-vegetarian/20 border-category-vegetarian/30',
  'quick-meals': 'bg-category-quick/10 hover:bg-category-quick/20 border-category-quick/30',
  appetizers: 'bg-primary/10 hover:bg-primary/20 border-primary/30',
  soups: 'bg-sage/10 hover:bg-sage/20 border-sage/30',
  salads: 'bg-category-vegetarian/10 hover:bg-category-vegetarian/20 border-category-vegetarian/30',
  beverages: 'bg-category-quick/10 hover:bg-category-quick/20 border-category-quick/30',
};

const CategoryCard = ({ category }) => {
  return (
    <Link 
      to={`/recipes?category=${category.id}`}
      className="block group"
    >
      <article 
        className={`
          p-6 rounded-xl border transition-all duration-300
          ${categoryBgColors[category.id]}
          hover:-translate-y-1 hover:shadow-card-lg
        `}
      >
        {/* Icon */}
        <div className="text-4xl mb-4">
          {category.icon}
        </div>

        {/* Name */}
        <h3 className="font-display text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
          {category.name}
        </h3>

        {/* Description */}
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {category.description}
        </p>

        {/* Recipe Count */}
        <p className="mt-3 text-sm font-medium text-primary">
          {category.recipeCount} recipes
        </p>
      </article>
    </Link>
  );
};

export default CategoryCard;