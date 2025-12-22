/**
 * Recipe Detail Page
 * Full recipe view with ingredients, instructions, and reviews
 */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Bookmark, 
  BookmarkCheck, 
  Star, 
  Printer, 
  Share2,
  ArrowLeft,
  Timer,
  Flame
} from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Recipe, RecipeCategory } from '@/types';
import { getRecipeById } from '@/api/recipes';
import { useSavedRecipes } from '@/context';
import { dummyReviews } from '@/data/recipes';

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

// Difficulty colors
const difficultyColors = {
  easy: 'bg-category-vegetarian/20 text-category-vegetarian',
  medium: 'bg-category-breakfast/20 text-category-breakfast',
  hard: 'bg-category-desserts/20 text-category-desserts',
};

const RecipeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isRecipeSaved, toggleSaveRecipe } = useSavedRecipes();

  // Fetch recipe on mount
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      
      try {
        const response = await getRecipeById(id);
        if (response.success) {
          setRecipe(response.data);
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Get reviews for this recipe
  const reviews = dummyReviews.filter(r => r.recipeId === id);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4" />
            <div className="h-[400px] bg-muted rounded-xl" />
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!recipe) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Recipe Not Found</h1>
          <p className="text-muted-foreground mb-6">The recipe you're looking for doesn't exist.</p>
          <Link to="/recipes">
            <Button>Browse Recipes</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const isSaved = isRecipeSaved(recipe.id);
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <Layout>
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-6">
        <Link to="/recipes">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Recipes
          </Button>
        </Link>
      </div>

      {/* Recipe Header */}
      <section className="py-6 lg:py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-card-lg">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              {/* Save Button */}
              <button
                onClick={() => toggleSaveRecipe(recipe.id)}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all ${
                  isSaved 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card/90 text-foreground hover:bg-card'
                }`}
              >
                {isSaved ? (
                  <BookmarkCheck className="h-6 w-6" />
                ) : (
                  <Bookmark className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Details */}
            <div className="flex flex-col">
              {/* Category & Difficulty */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="secondary">{categoryNames[recipe.category]}</Badge>
                <Badge className={difficultyColors[recipe.difficulty]}>
                  {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {recipe.title}
              </h1>

              {/* Description */}
              <p className="text-lg text-muted-foreground mb-6">
                {recipe.description}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mb-6">
                {recipe.authorAvatar && (
                  <img
                    src={recipe.authorAvatar}
                    alt={recipe.authorName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-medium text-foreground">{recipe.authorName}</p>
                  <p className="text-sm text-muted-foreground">Recipe Creator</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 ${
                        star <= Math.round(recipe.rating)
                          ? 'fill-category-breakfast text-category-breakfast'
                          : 'text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{recipe.rating}</span>
                <span className="text-muted-foreground">({recipe.reviewCount} reviews)</span>
              </div>

              {/* Time & Servings */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-xl mb-6">
                <div className="text-center">
                  <Timer className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Prep Time</p>
                  <p className="font-semibold">{recipe.prepTime} min</p>
                </div>
                <div className="text-center">
                  <Flame className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Cook Time</p>
                  <p className="font-semibold">{recipe.cookTime} min</p>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground">Servings</p>
                  <p className="font-semibold">{recipe.servings}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <Button 
                  onClick={() => toggleSaveRecipe(recipe.id)}
                  variant={isSaved ? 'default' : 'outline'}
                  className="gap-2"
                >
                  {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                  {isSaved ? 'Saved' : 'Save Recipe'}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Ingredients & Instructions */}
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Ingredients */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-xl p-6 shadow-card-md">
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  Ingredients
                </h2>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={ingredient.id} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full border-2 border-primary" />
                      <span className="text-foreground">
                        <span className="font-medium">{ingredient.quantity} {ingredient.unit}</span>{' '}
                        {ingredient.name}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Nutrition Info */}
                {recipe.nutrition && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <h3 className="font-semibold text-foreground mb-4">Nutrition (per serving)</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Calories</span>
                        <span className="font-medium">{recipe.nutrition.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Protein</span>
                        <span className="font-medium">{recipe.nutrition.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Carbs</span>
                        <span className="font-medium">{recipe.nutrition.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fat</span>
                        <span className="font-medium">{recipe.nutrition.fat}g</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Instructions
              </h2>
              <ol className="space-y-6">
                {recipe.instructions.map((step) => (
                  <li key={step.stepNumber} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {step.stepNumber}
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="text-foreground leading-relaxed">{step.instruction}</p>
                      {step.duration && (
                        <p className="mt-2 text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {step.duration} minutes
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>

              {/* Tags */}
              <div className="mt-10 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Link key={tag} to={`/recipes?q=${tag}`}>
                      <Badge variant="outline" className="hover:bg-muted">
                        #{tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Reviews Section */}
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Reviews ({reviews.length})
          </h2>

          {reviews.length > 0 ? (
            <div className="space-y-6 max-w-2xl">
              {reviews.map((review) => (
                <div key={review.id} className="bg-card rounded-xl p-6 shadow-card-sm">
                  <div className="flex items-start gap-4">
                    <img
                      src={review.userAvatar}
                      alt={review.userName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-foreground">{review.userName}</h4>
                        <span className="text-sm text-muted-foreground">{review.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? 'fill-category-breakfast text-category-breakfast'
                                : 'text-muted'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/50 rounded-xl">
              <p className="text-muted-foreground mb-4">No reviews yet. Be the first to review this recipe!</p>
              <Button>Write a Review</Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default RecipeDetailPage;
