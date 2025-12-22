/**
 * Homepage
 * Main landing page with Hero, Categories, and Trending Recipes
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChefHat, Clock, Utensils, Users } from 'lucide-react';
import { Layout } from '@/components/layout';
import { RecipeCard, CategoryCard, SearchBar } from '@/components/recipes';
import { Button } from '@/components/ui/button';
import { Recipe, RecipeCardData } from '@/types';
import { getTrendingRecipes } from '@/api/recipes';
import { categories } from '@/data/recipes';

const HomePage: React.FC = () => {
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch trending recipes on mount
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await getTrendingRecipes();
        if (response.success) {
          setTrendingRecipes(response.data);
        }
      } catch (error) {
        console.error('Error fetching trending recipes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);

  // Convert Recipe to RecipeCardData
  const toCardData = (recipe: Recipe): RecipeCardData => ({
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

  // Stats for the hero section
  const stats = [
    { icon: Utensils, value: '10,000+', label: 'Recipes' },
    { icon: Users, value: '50,000+', label: 'Home Cooks' },
    { icon: ChefHat, value: '500+', label: 'Pro Chefs' },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-coral-light via-background to-sage-light">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
              <ChefHat className="h-4 w-4" />
              <span>Discover Delicious Recipes</span>
            </div>

            {/* Heading */}
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in animation-delay-100">
              Cook Something{' '}
              <span className="text-primary">Amazing</span>{' '}
              Today
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in animation-delay-200">
              Explore thousands of recipes from passionate home cooks and professional chefs. 
              Find your next favorite dish and share your own culinary creations.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8 animate-fade-in animation-delay-300">
              <SearchBar />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in animation-delay-400">
              <Link to="/recipes">
                <Button size="lg" className="gap-2 text-base px-8">
                  Browse Recipes
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/submit">
                <Button size="lg" variant="outline" className="text-base px-8">
                  Share Your Recipe
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 animate-fade-in animation-delay-500">
              {stats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
      </section>

      {/* Featured Categories Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                Browse by Category
              </h2>
              <p className="mt-2 text-muted-foreground">
                Find recipes that match your mood and cravings
              </p>
            </div>
            <Link to="/categories">
              <Button variant="ghost" className="gap-2">
                View All Categories
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Recipes Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
                Trending Recipes
              </h2>
              <p className="mt-2 text-muted-foreground">
                Popular dishes loved by our community this week
              </p>
            </div>
            <Link to="/recipes?filter=trending">
              <Button variant="ghost" className="gap-2">
                View All Trending
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Recipes Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
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
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingRecipes.slice(0, 8).map((recipe, index) => (
                <div 
                  key={recipe.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <RecipeCard recipe={toCardData(recipe)} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Share Your Recipe?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              Join our community of passionate cooks and share your favorite recipes with food lovers around the world.
            </p>
            <Link to="/submit">
              <Button 
                size="lg" 
                variant="secondary"
                className="gap-2 text-base px-8"
              >
                <ChefHat className="h-5 w-5" />
                Submit Your Recipe
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
