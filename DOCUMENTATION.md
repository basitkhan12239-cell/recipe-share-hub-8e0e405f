# 📖 TastyBites - Complete Project Documentation

> A modern recipe sharing platform built with React, TypeScript, and Tailwind CSS

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Pages & Routes](#pages--routes)
5. [Components](#components)
6. [TypeScript Types](#typescript-types)
7. [Context & State Management](#context--state-management)
8. [API Services](#api-services)
9. [Features](#features)
10. [Sample Data](#sample-data)
11. [Styling & Design System](#styling--design-system)
12. [How to Connect Backend](#how-to-connect-backend)
13. [Future Improvements](#future-improvements)

---

## 🎯 Project Overview

**TastyBites** is a recipe sharing web application where users can:
- Browse thousands of recipes
- Filter by category, difficulty, and cook time
- Save favorite recipes (bookmarks)
- Submit their own recipes
- View detailed recipe instructions with nutrition info

### Key Highlights
- 🎨 Modern, responsive UI design
- 🌙 Dark mode support
- 📱 Mobile-first approach
- ⚡ Fast loading with skeleton states
- 🔍 Advanced search & filtering

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | Frontend UI framework |
| TypeScript | Latest | Type safety & developer experience |
| Vite | Latest | Build tool & dev server |
| Tailwind CSS | Latest | Utility-first CSS framework |
| Shadcn/UI | Latest | Pre-built UI components |
| React Router | 6.30.1 | Client-side routing |
| TanStack Query | 5.83.0 | Server state management |
| Axios | 1.13.2 | HTTP client |
| Lucide React | 0.462.0 | Icon library |
| Sonner | 1.7.4 | Toast notifications |

---

## 📁 Project Structure

```
tastybites/
├── public/
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── src/
│   ├── api/                      # API service layer
│   │   ├── auth.ts              # Authentication API calls
│   │   ├── config.ts            # Axios configuration
│   │   ├── recipes.ts           # Recipe API calls
│   │   └── index.ts             # Barrel export
│   │
│   ├── components/
│   │   ├── layout/              # Layout components
│   │   │   ├── Navbar.tsx       # Main navigation bar
│   │   │   ├── Footer.tsx       # Site footer
│   │   │   ├── Layout.tsx       # Page wrapper component
│   │   │   └── index.ts
│   │   │
│   │   ├── recipes/             # Recipe-specific components
│   │   │   ├── RecipeCard.tsx   # Recipe preview card
│   │   │   ├── CategoryCard.tsx # Category display card
│   │   │   ├── SearchBar.tsx    # Search input component
│   │   │   └── index.ts
│   │   │
│   │   └── ui/                  # Shadcn UI components (60+ files)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── tabs.tsx
│   │       └── ... (more components)
│   │
│   ├── context/                 # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   ├── SavedRecipesContext.tsx # Bookmarks state
│   │   └── index.ts
│   │
│   ├── data/
│   │   └── recipes.ts           # Sample/dummy recipe data
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-toast.ts         # Toast notification hook
│   │   └── use-mobile.tsx       # Mobile detection hook
│   │
│   ├── lib/
│   │   └── utils.ts             # Utility functions (cn helper)
│   │
│   ├── pages/                   # Page components
│   │   ├── HomePage.tsx         # Landing page
│   │   ├── RecipeListPage.tsx   # Recipe browse page
│   │   ├── RecipeDetailPage.tsx # Single recipe view
│   │   ├── SubmitRecipePage.tsx # Recipe submission form
│   │   ├── ProfilePage.tsx      # User profile page
│   │   ├── CategoriesPage.tsx   # Categories listing
│   │   └── NotFound.tsx         # 404 error page
│   │
│   ├── types/                   # TypeScript type definitions
│   │   ├── recipe.ts            # Recipe-related types
│   │   ├── user.ts              # User-related types
│   │   └── index.ts
│   │
│   ├── App.tsx                  # Main app component with routes
│   ├── App.css                  # App-specific styles
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles & design tokens
│
├── index.html                   # HTML template
├── tailwind.config.ts           # Tailwind configuration
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies & scripts
```

---

## 📄 Pages & Routes

### Route Configuration (App.tsx)

| Route | Component | Status | Description |
|-------|-----------|--------|-------------|
| `/` | HomePage | ✅ Complete | Landing page with hero, categories, trending |
| `/recipes` | RecipeListPage | ✅ Complete | Browse all recipes with filters |
| `/recipe/:id` | RecipeDetailPage | ✅ Complete | Full recipe details view |
| `/submit` | SubmitRecipePage | ⚠️ UI Only | Recipe submission form |
| `/profile` | ProfilePage | ✅ Complete | User profile & saved recipes |
| `/categories` | CategoriesPage | ✅ Complete | All categories grid |
| `/login` | NotFound | ❌ Not Built | Placeholder route |
| `/blog` | NotFound | ❌ Not Built | Placeholder route |
| `/contact` | NotFound | ❌ Not Built | Placeholder route |
| `*` | NotFound | ✅ Complete | 404 catch-all |

### Page Details

#### 1. HomePage (`/`)
- Hero section with search bar
- Stats display (recipes, cooks, chefs)
- Featured categories grid (6 categories)
- Trending recipes section (8 recipes)
- CTA section for recipe submission

#### 2. RecipeListPage (`/recipes`)
- Search functionality
- Filter by: Category, Cook Time, Difficulty
- Active filters display with remove option
- Responsive grid layout
- Pagination support
- Loading skeleton states

#### 3. RecipeDetailPage (`/recipe/:id`)
- Large recipe image with save button
- Recipe metadata (category, difficulty, time)
- Author information
- Star rating display
- Ingredients list with checkboxes
- Step-by-step instructions
- Nutrition information
- Tags with links
- Reviews section

#### 4. SubmitRecipePage (`/submit`)
- Multi-section form:
  - Basic info (title, description, category, difficulty)
  - Time & servings inputs
  - Image upload area
  - Dynamic ingredients list (add/remove)
  - Dynamic instructions list (add/remove)
- Form validation
- Toast notification on submit

#### 5. ProfilePage (`/profile`)
- User avatar & info display
- Stats (recipes count, saved count)
- Tabbed interface:
  - Saved Recipes tab
  - My Recipes tab
- Empty states for each tab

#### 6. CategoriesPage (`/categories`)
- Grid display of all categories
- Animated entrance
- Click to filter recipes

---

## 🧩 Components

### Layout Components

#### Navbar (`src/components/layout/Navbar.tsx`)
```typescript
// Features:
- Logo with ChefHat icon
- Desktop navigation links
- Mobile hamburger menu
- Search button
- Saved recipes button
- User profile / Sign in button
- Active link highlighting
```

#### Layout (`src/components/layout/Layout.tsx`)
```typescript
// Wraps pages with:
- Navbar
- Main content area
- Footer
```

### Recipe Components

#### RecipeCard (`src/components/recipes/RecipeCard.tsx`)
```typescript
interface RecipeCardProps {
  recipe: RecipeCardData;
}

// Features:
- Recipe image with hover zoom
- Category badge (color-coded)
- Save/bookmark button
- Cook time display
- Title & description
- Author avatar & name
- Star rating
```

#### CategoryCard (`src/components/recipes/CategoryCard.tsx`)
```typescript
interface CategoryCardProps {
  category: CategoryInfo;
}

// Features:
- Category emoji icon
- Category name
- Recipe count
- Hover effects
- Link to filtered recipes
```

#### SearchBar (`src/components/recipes/SearchBar.tsx`)
```typescript
// Features:
- Search input with icon
- Submit on enter
- Clear button
- Responsive design
```

---

## 📝 TypeScript Types

### Recipe Types (`src/types/recipe.ts`)

```typescript
// Recipe Categories
type RecipeCategory = 
  | 'breakfast'
  | 'lunch'
  | 'dinner'
  | 'desserts'
  | 'vegetarian'
  | 'quick-meals'
  | 'appetizers'
  | 'soups'
  | 'salads'
  | 'beverages';

// Difficulty Levels
type DifficultyLevel = 'easy' | 'medium' | 'hard';

// Ingredient
interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

// Instruction Step
interface InstructionStep {
  stepNumber: number;
  instruction: string;
  duration?: number; // Optional, in minutes
}

// Nutrition Information
interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
}

// Review
interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string;
}

// Main Recipe Interface
interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: RecipeCategory;
  difficulty: DifficultyLevel;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Ingredient[];
  instructions: InstructionStep[];
  nutrition?: NutritionInfo;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isTrending?: boolean;
  createdAt: string;
  updatedAt: string;
}

// Recipe Card Data (Simplified for listings)
interface RecipeCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  category: RecipeCategory;
  difficulty: DifficultyLevel;
  prepTime: number;
  cookTime: number;
  rating: number;
  reviewCount: number;
  authorName: string;
  authorAvatar?: string;
}

// Recipe Form Data (For submission)
interface RecipeFormData {
  title: string;
  description: string;
  image: File | null;
  category: RecipeCategory;
  difficulty: DifficultyLevel;
  prepTime: number;
  cookTime: number;
  servings: number;
  ingredients: Omit<Ingredient, 'id'>[];
  instructions: string[];
  tags: string[];
}

// Category Info
interface CategoryInfo {
  id: RecipeCategory;
  name: string;
  description: string;
  icon: string; // Emoji
  recipeCount: number;
  color: string;
}

// Filter Options
interface RecipeFilters {
  category?: RecipeCategory;
  difficulty?: DifficultyLevel;
  maxCookTime?: number;
  minRating?: number;
  searchQuery?: string;
}

// Pagination
interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationInfo;
}
```

### User Types (`src/types/user.ts`)

```typescript
// User Profile
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  joinedAt: string;
  recipesCount: number;
  followersCount: number;
  followingCount: number;
}

// Authentication State
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Login Credentials
interface LoginCredentials {
  email: string;
  password: string;
}

// Registration Data
interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Auth Response
interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  message?: string;
}
```

---

## 🔄 Context & State Management

### AuthContext (`src/context/AuthContext.tsx`)

```typescript
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

// Usage:
const { user, isAuthenticated, login, logout } = useAuth();
```

**Features:**
- JWT token storage in localStorage
- Auto-check session on mount
- Login/Register/Logout functions
- Loading & error states

### SavedRecipesContext (`src/context/SavedRecipesContext.tsx`)

```typescript
interface SavedRecipesContextType {
  savedRecipes: string[]; // Array of recipe IDs
  saveRecipe: (recipeId: string) => void;
  unsaveRecipe: (recipeId: string) => void;
  isRecipeSaved: (recipeId: string) => boolean;
  toggleSaveRecipe: (recipeId: string) => void;
}

// Usage:
const { savedRecipes, toggleSaveRecipe, isRecipeSaved } = useSavedRecipes();
```

**Features:**
- localStorage persistence
- Add/remove bookmarks
- Check if recipe is saved
- Toggle save status

---

## 🌐 API Services

### Configuration (`src/api/config.ts`)
```typescript
// Axios instance with base URL and interceptors
const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});
```

### Auth API (`src/api/auth.ts`)

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `login` | `LoginCredentials` | `AuthResponse` | User login |
| `register` | `RegisterData` | `AuthResponse` | User registration |
| `logout` | - | `{ success: boolean }` | User logout |
| `getCurrentUser` | - | `{ user: User }` | Get logged in user |
| `updateProfile` | `Partial<User>` | `{ user: User }` | Update profile |

### Recipes API (`src/api/recipes.ts`)

| Function | Parameters | Returns | Description |
|----------|------------|---------|-------------|
| `getRecipes` | `filters?, page?, limit?` | `ApiResponse<Recipe[]>` | Get all recipes |
| `getRecipeById` | `id` | `ApiResponse<Recipe>` | Get single recipe |
| `getFeaturedRecipes` | - | `ApiResponse<Recipe[]>` | Get featured recipes |
| `getTrendingRecipes` | - | `ApiResponse<Recipe[]>` | Get trending recipes |
| `submitRecipe` | `RecipeFormData` | `ApiResponse<Recipe>` | Submit new recipe |
| `getUserRecipes` | `userId` | `ApiResponse<Recipe[]>` | Get user's recipes |

**Note:** Currently using dummy data. Set `USE_DUMMY_DATA = false` to use real API.

---

## ✨ Features

### ✅ Working Features

| Feature | Description | Location |
|---------|-------------|----------|
| Recipe Browsing | View all recipes in grid | RecipeListPage |
| Recipe Details | Full recipe with instructions | RecipeDetailPage |
| Category Filter | Filter by meal type | RecipeListPage |
| Difficulty Filter | Filter by easy/medium/hard | RecipeListPage |
| Cook Time Filter | Filter by cooking duration | RecipeListPage |
| Search | Search by title, description, tags | SearchBar |
| Pagination | Navigate through pages | RecipeListPage |
| Save Recipes | Bookmark favorites | RecipeCard, RecipeDetailPage |
| Responsive Design | Works on all devices | All pages |
| Loading States | Skeleton animations | All pages |
| Toast Notifications | Success/error messages | SubmitRecipePage |
| Mobile Menu | Hamburger navigation | Navbar |
| Dark Mode | CSS variables ready | index.css |

### ❌ Not Yet Implemented (Needs Backend)

| Feature | What's Needed |
|---------|--------------|
| Real Authentication | Database + JWT |
| Recipe Submission to DB | Backend API + File upload |
| User Registration | Database + Email verification |
| Reviews/Comments | Database + API |
| Profile Editing | Backend API |
| Social Sharing | Share API integration |
| Print Recipe | Print CSS styles |
| Email Notifications | Email service |

---

## 📊 Sample Data

### Categories (6)

| ID | Name | Icon | Recipe Count |
|----|------|------|--------------|
| breakfast | Breakfast | 🌅 | 45 |
| lunch | Lunch | 🥗 | 62 |
| dinner | Dinner | 🍝 | 89 |
| desserts | Desserts | 🍰 | 54 |
| vegetarian | Vegetarian | 🥬 | 78 |
| quick-meals | Quick Meals | ⚡ | 67 |

### Sample Recipes (8)

1. **Classic Margherita Pizza** - Dinner, Medium, 45min
2. **Fluffy Blueberry Pancakes** - Breakfast, Easy, 30min
3. **Thai Green Curry** - Dinner, Medium, 45min
4. **Chocolate Lava Cake** - Desserts, Medium, 27min
5. **Mediterranean Quinoa Salad** - Vegetarian, Easy, 30min
6. **Garlic Butter Shrimp Pasta** - Quick Meals, Easy, 25min
7. **Avocado Toast with Poached Eggs** - Breakfast, Easy, 15min
8. **Classic Beef Tacos** - Dinner, Easy, 30min

---

## 🎨 Styling & Design System

### Design Tokens (index.css)

```css
:root {
  /* Colors */
  --background: 30 50% 98%;
  --foreground: 20 20% 20%;
  --primary: 24 95% 53%;        /* Orange */
  --secondary: 45 93% 47%;      /* Yellow */
  --accent: 142 76% 36%;        /* Green */
  
  /* Category Colors */
  --category-breakfast: 45 93% 47%;
  --category-lunch: 142 76% 36%;
  --category-dinner: 24 95% 53%;
  --category-desserts: 340 82% 52%;
  --category-vegetarian: 142 76% 36%;
  --category-quick: 199 89% 48%;
  
  /* Fonts */
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}
```

### Tailwind Extensions (tailwind.config.ts)

- Custom colors mapped to CSS variables
- Font families (display, body)
- Custom animations (fade-in, etc.)
- Shadow utilities (card-sm, card-md, card-lg)

---

## 🔌 How to Connect Backend

### Step 1: Update API Config

```typescript
// src/api/config.ts
const apiClient = axios.create({
  baseURL: 'https://your-api-url.com/api',
  // ...
});
```

### Step 2: Disable Dummy Data

```typescript
// src/api/auth.ts & src/api/recipes.ts
const USE_DUMMY_DATA = false; // Change to false
```

### Step 3: Backend API Endpoints Required

```
POST   /api/auth/login
POST   /api/auth/register
POST   /api/auth/logout
GET    /api/auth/me
PUT    /api/auth/profile

GET    /api/recipes?category=&difficulty=&page=&limit=
GET    /api/recipes/:id
GET    /api/recipes/featured
GET    /api/recipes/trending
POST   /api/recipes
GET    /api/recipes/user/:userId
```

---

## 🚀 Future Improvements

### Priority 1 (High)
- [ ] Real authentication system
- [ ] Login/Register pages
- [ ] Recipe submission to database
- [ ] Image upload functionality

### Priority 2 (Medium)
- [ ] Reviews & comments system
- [ ] User profile editing
- [ ] Recipe editing/deletion
- [ ] Advanced search filters

### Priority 3 (Low)
- [ ] Social sharing
- [ ] Print recipe feature
- [ ] Email notifications
- [ ] Recipe collections/folders
- [ ] Following other users
- [ ] Recipe recommendations

---

## 📞 Support

For questions or issues, please check:
- Project source code
- Shadcn/UI documentation: https://ui.shadcn.com
- Tailwind CSS documentation: https://tailwindcss.com
- React Router documentation: https://reactrouter.com

---

*Documentation generated for TastyBites Recipe Sharing Platform*
*Last updated: December 2024*
