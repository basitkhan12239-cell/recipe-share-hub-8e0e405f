import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, SavedRecipesProvider } from "@/context";

// Pages
import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailPage from "./pages/RecipeDetailPage";
import SubmitRecipePage from "./pages/SubmitRecipePage";
import ProfilePage from "./pages/ProfilePage";
import CategoriesPage from "./pages/CategoriesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SavedRecipesProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipes" element={<RecipeListPage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/submit" element={<SubmitRecipePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              {/* Placeholder routes */}
              <Route path="/blog" element={<NotFound />} />
              <Route path="/contact" element={<NotFound />} />
              <Route path="/login" element={<NotFound />} />
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SavedRecipesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
