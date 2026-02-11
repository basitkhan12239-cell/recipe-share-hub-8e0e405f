/**
 * Submit Recipe Page
 * Form to submit a new recipe with full validation
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Trash2, Upload, ChefHat, ImagePlus, X } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { submitRecipe } from '@/api/recipes';
import { RecipeCategory, DifficultyLevel } from '@/types';

const recipeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Please select a category'),
  difficulty: z.string().min(1, 'Please select difficulty'),
  prepTime: z.coerce.number().min(1, 'Required'),
  cookTime: z.coerce.number().min(0, 'Required'),
  servings: z.coerce.number().min(1, 'Required'),
  ingredients: z.array(z.object({
    name: z.string().min(1, 'Ingredient name required'),
    quantity: z.string().min(1, 'Qty required'),
    unit: z.string(),
  })).min(1, 'Add at least one ingredient'),
  instructions: z.array(z.object({
    text: z.string().min(1, 'Step description required'),
  })).min(1, 'Add at least one step'),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

const SubmitRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      difficulty: '',
      prepTime: 0,
      cookTime: 0,
      servings: 1,
      ingredients: [{ name: '', quantity: '', unit: '' }],
      instructions: [{ text: '' }],
    },
  });

  const { fields: ingredientFields, append: addIngredient, remove: removeIngredient } = useFieldArray({ control, name: 'ingredients' });
  const { fields: instructionFields, append: addInstruction, remove: removeInstruction } = useFieldArray({ control, name: 'instructions' });

  const onSubmit = async (data: RecipeFormValues) => {
    try {
      await submitRecipe({
        title: data.title,
        description: data.description,
        image: imageFile,
        category: data.category as RecipeCategory,
        difficulty: data.difficulty as DifficultyLevel,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        servings: data.servings,
        ingredients: data.ingredients as { name: string; quantity: string; unit: string }[],
        instructions: data.instructions.map(i => i.text),
        tags: [],
      });

      toast({ title: 'Recipe Submitted! 🎉', description: 'Your recipe has been submitted for review.' });
      navigate('/recipes');
    } catch {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    }
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Info */}
            <div className="bg-card p-6 rounded-xl shadow-card-md space-y-4">
              <h2 className="font-display text-xl font-semibold">Basic Information</h2>

              {/* Image Upload */}
              <div>
                <Label>Recipe Image</Label>
                {imagePreview ? (
                  <div className="relative mt-2 w-full h-48 rounded-lg overflow-hidden">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={removeImage}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="mt-2 flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                    <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Click to upload image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div>
                <Label htmlFor="title">Recipe Title *</Label>
                <Input id="title" placeholder="e.g., Classic Margherita Pizza" {...register('title')} />
                {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea id="description" placeholder="Describe your recipe..." rows={3} {...register('description')} />
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Select onValueChange={(val) => setValue('category', val)} value={watch('category')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="desserts">Desserts</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="quick-meals">Quick Meals</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
                </div>
                <div>
                  <Label>Difficulty *</Label>
                  <Select onValueChange={(val) => setValue('difficulty', val)} value={watch('difficulty')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.difficulty && <p className="text-sm text-destructive mt-1">{errors.difficulty.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="prepTime">Prep Time (min)</Label>
                  <Input id="prepTime" type="number" min="0" {...register('prepTime')} />
                  {errors.prepTime && <p className="text-sm text-destructive mt-1">{errors.prepTime.message}</p>}
                </div>
                <div>
                  <Label htmlFor="cookTime">Cook Time (min)</Label>
                  <Input id="cookTime" type="number" min="0" {...register('cookTime')} />
                  {errors.cookTime && <p className="text-sm text-destructive mt-1">{errors.cookTime.message}</p>}
                </div>
                <div>
                  <Label htmlFor="servings">Servings</Label>
                  <Input id="servings" type="number" min="1" {...register('servings')} />
                  {errors.servings && <p className="text-sm text-destructive mt-1">{errors.servings.message}</p>}
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-card p-6 rounded-xl shadow-card-md space-y-4">
              <h2 className="font-display text-xl font-semibold">Ingredients</h2>
              {ingredientFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <div className="w-20">
                    <Input placeholder="Qty" {...register(`ingredients.${index}.quantity`)} />
                    {errors.ingredients?.[index]?.quantity && <p className="text-xs text-destructive mt-1">Required</p>}
                  </div>
                  <Input placeholder="Unit" className="w-24" {...register(`ingredients.${index}.unit`)} />
                  <div className="flex-1">
                    <Input placeholder="Ingredient name" {...register(`ingredients.${index}.name`)} />
                    {errors.ingredients?.[index]?.name && <p className="text-xs text-destructive mt-1">Required</p>}
                  </div>
                  {ingredientFields.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addIngredient({ name: '', quantity: '', unit: '' })} className="gap-2">
                <Plus className="h-4 w-4" />Add Ingredient
              </Button>
            </div>

            {/* Instructions */}
            <div className="bg-card p-6 rounded-xl shadow-card-md space-y-4">
              <h2 className="font-display text-xl font-semibold">Instructions</h2>
              {instructionFields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start">
                  <span className="flex-shrink-0 w-8 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <Textarea placeholder="Describe this step..." rows={2} {...register(`instructions.${index}.text`)} />
                    {errors.instructions?.[index]?.text && <p className="text-xs text-destructive mt-1">Required</p>}
                  </div>
                  {instructionFields.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeInstruction(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => addInstruction({ text: '' })} className="gap-2">
                <Plus className="h-4 w-4" />Add Step
              </Button>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Recipe'}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default SubmitRecipePage;
