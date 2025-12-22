/**
 * Profile Page
 * User profile with saved and submitted recipes
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { User, BookmarkIcon, ChefHat, Settings } from 'lucide-react';
import { Layout } from '@/components/layout';
import { RecipeCard } from '@/components/recipes';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth, useSavedRecipes } from '@/context';
import { dummyRecipes } from '@/data/recipes';
import { RecipeCardData } from '@/types';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { savedRecipes } = useSavedRecipes();

  // Get saved recipes data
  const savedRecipeData = dummyRecipes.filter(r => savedRecipes.includes(r.id));
  
  // Get user's submitted recipes (dummy)
  const submittedRecipes = dummyRecipes.filter(r => r.authorId === 'user-1').slice(0, 4);

  // Convert to card data
  const toCardData = (recipe: typeof dummyRecipes[0]): RecipeCardData => ({
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

  // Demo user for non-authenticated state
  const displayUser = user || {
    name: 'Guest User',
    email: 'guest@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    bio: 'Sign in to save recipes and submit your own creations!',
    recipesCount: 0,
    followersCount: 0,
    followingCount: 0,
  };

  return (
    <Layout>
      {/* Profile Header */}
      <section className="bg-gradient-to-b from-coral-light/50 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto">
            <img
              src={displayUser.avatar}
              alt={displayUser.name}
              className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border-4 border-card shadow-card-lg"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="font-display text-2xl lg:text-3xl font-bold text-foreground">{displayUser.name}</h1>
              <p className="text-muted-foreground mt-1">{displayUser.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-4">
                <div><span className="font-bold text-foreground">{submittedRecipes.length}</span><span className="text-muted-foreground ml-1">Recipes</span></div>
                <div><span className="font-bold text-foreground">{savedRecipes.length}</span><span className="text-muted-foreground ml-1">Saved</span></div>
              </div>
            </div>
            <Button variant="outline" className="gap-2"><Settings className="h-4 w-4" />Edit Profile</Button>
          </div>
        </div>
      </section>

      {/* Tabs Content */}
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="saved" className="max-w-6xl mx-auto">
            <TabsList className="mb-8">
              <TabsTrigger value="saved" className="gap-2"><BookmarkIcon className="h-4 w-4" />Saved Recipes</TabsTrigger>
              <TabsTrigger value="submitted" className="gap-2"><ChefHat className="h-4 w-4" />My Recipes</TabsTrigger>
            </TabsList>

            <TabsContent value="saved">
              {savedRecipeData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {savedRecipeData.map((recipe) => (<RecipeCard key={recipe.id} recipe={toCardData(recipe)} />))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted/50 rounded-xl">
                  <BookmarkIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">No Saved Recipes</h3>
                  <p className="text-muted-foreground mb-6">Start saving recipes you love!</p>
                  <Link to="/recipes"><Button>Browse Recipes</Button></Link>
                </div>
              )}
            </TabsContent>

            <TabsContent value="submitted">
              {submittedRecipes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {submittedRecipes.map((recipe) => (<RecipeCard key={recipe.id} recipe={toCardData(recipe)} />))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted/50 rounded-xl">
                  <ChefHat className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-display text-xl font-semibold mb-2">No Recipes Yet</h3>
                  <p className="text-muted-foreground mb-6">Share your culinary creations!</p>
                  <Link to="/submit"><Button>Submit Recipe</Button></Link>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default ProfilePage;
