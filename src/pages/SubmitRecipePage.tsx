/**
 * Submit Recipe Page
 * Form to submit a new recipe
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Upload, ChefHat } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { RecipeCategory, DifficultyLevel } from '@/types';

const SubmitRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '', unit: '' }]);
  const [instructions, setInstructions] = useState(['']);

  const handleAddIngredient = () => setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  const handleRemoveIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));
  const handleAddInstruction = () => setInstructions([...instructions, '']);
  const handleRemoveInstruction = (index: number) => setInstructions(instructions.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({ title: 'Recipe Submitted!', description: 'Your recipe has been submitted for review.' });
    setIsSubmitting(false);
    navigate('/recipes');
  };

  return (
    <Layout>
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <ChefHat className="h-12 w-12 mx-auto text-primary mb-4" />
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">Submit Your Recipe</h1>
            <p className="text-muted-foreground">Share your culinary creation with our community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-card p-6 rounded-xl shadow-card-md space-y-4">
              <h2 className="font-display text-xl font-semibold">Basic Information</h2>
              <div><Label htmlFor="title">Recipe Title *</Label><Input id="title" placeholder="e.g., Classic Margherita Pizza" required /></div>
              <div><Label htmlFor="description">Description *</Label><Textarea id="description" placeholder="Describe your recipe..." rows={3} required /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Category *</Label><Select required><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="breakfast">Breakfast</SelectItem><SelectItem value="lunch">Lunch</SelectItem><SelectItem value="dinner">Dinner</SelectItem><SelectItem value="desserts">Desserts</SelectItem></SelectContent></Select></div>
                <div><Label>Difficulty *</Label><Select required><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="easy">Easy</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="hard">Hard</SelectItem></SelectContent></Select></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label htmlFor="prep">Prep Time (min)</Label><Input id="prep" type="number" min="0" required /></div>
                <div><Label htmlFor="cook">Cook Time (min)</Label><Input id="cook" type="number" min="0" required /></div>
                <div><Label htmlFor="servings">Servings</Label><Input id="servings" type="number" min="1" required /></div>
              </div>
              <div><Label>Recipe Image</Label><div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors cursor-pointer"><Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" /><p className="text-muted-foreground">Click to upload or drag and drop</p></div></div>
            </div>

            {/* Ingredients */}
            <div className="bg-card p-6 rounded-xl shadow-card-md space-y-4">
              <h2 className="font-display text-xl font-semibold">Ingredients</h2>
              {ingredients.map((_, index) => (
                <div key={index} className="flex gap-2">
                  <Input placeholder="Qty" className="w-20" />
                  <Input placeholder="Unit" className="w-24" />
                  <Input placeholder="Ingredient name" className="flex-1" />
                  {ingredients.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveIngredient(index)}><Trash2 className="h-4 w-4" /></Button>}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleAddIngredient} className="gap-2"><Plus className="h-4 w-4" />Add Ingredient</Button>
            </div>

            {/* Instructions */}
            <div className="bg-card p-6 rounded-xl shadow-card-md space-y-4">
              <h2 className="font-display text-xl font-semibold">Instructions</h2>
              {instructions.map((_, index) => (
                <div key={index} className="flex gap-2">
                  <span className="flex-shrink-0 w-8 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">{index + 1}</span>
                  <Textarea placeholder="Describe this step..." className="flex-1" rows={2} />
                  {instructions.length > 1 && <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveInstruction(index)}><Trash2 className="h-4 w-4" /></Button>}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleAddInstruction} className="gap-2"><Plus className="h-4 w-4" />Add Step</Button>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Recipe'}</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default SubmitRecipePage;
