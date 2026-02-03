/**
 * Categories Page
 * Display all recipe categories
 */

import React from 'react';
import { Layout } from '@/components/layout';
import { CategoryCard } from '@/components/recipes';
import { categories } from '@/data/recipes';

const CategoriesPage = () => {
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-sage-light/50 to-background py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Recipe Categories
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse collection of recipes organized by meal type and dietary preferences
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoriesPage;