/**
 * Blog Page
 * Food blog with articles and cooking tips
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, User, Tag } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: '10 Essential Kitchen Tools Every Home Cook Needs',
    excerpt: 'From sharp knives to reliable thermometers, discover the must-have tools that will transform your cooking experience and make meal prep easier than ever.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop',
    author: 'Chef Maria',
    authorAvatar: 'https://i.pravatar.cc/100?img=1',
    date: '2024-01-15',
    readTime: 8,
    category: 'Kitchen Tips',
    featured: true,
  },
  {
    id: 2,
    title: 'The Secret to Perfect Homemade Pasta',
    excerpt: 'Learn the techniques Italian grandmothers have passed down for generations. Fresh pasta is easier than you think!',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&auto=format&fit=crop',
    author: 'Antonio Rossi',
    authorAvatar: 'https://i.pravatar.cc/100?img=3',
    date: '2024-01-12',
    readTime: 12,
    category: 'Techniques',
    featured: false,
  },
  {
    id: 3,
    title: 'Seasonal Cooking: Winter Comfort Foods',
    excerpt: 'Warm up your kitchen with these cozy recipes perfect for cold winter nights. Soups, stews, and more!',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&auto=format&fit=crop',
    author: 'Emma Wilson',
    authorAvatar: 'https://i.pravatar.cc/100?img=5',
    date: '2024-01-10',
    readTime: 6,
    category: 'Seasonal',
    featured: false,
  },
  {
    id: 4,
    title: 'Meal Prep Sunday: A Complete Guide',
    excerpt: 'Save time and eat healthier by mastering the art of meal prep. Plan your week like a pro chef.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop',
    author: 'Chef Maria',
    authorAvatar: 'https://i.pravatar.cc/100?img=1',
    date: '2024-01-08',
    readTime: 10,
    category: 'Meal Prep',
    featured: false,
  },
  {
    id: 5,
    title: 'Understanding Spices: Building Flavor Profiles',
    excerpt: 'Unlock the secrets of spice combinations that will elevate your dishes from good to extraordinary.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop',
    author: 'Raj Patel',
    authorAvatar: 'https://i.pravatar.cc/100?img=8',
    date: '2024-01-05',
    readTime: 15,
    category: 'Ingredients',
    featured: false,
  },
  {
    id: 6,
    title: 'Plant-Based Proteins: Complete Guide',
    excerpt: 'Explore delicious and nutritious plant-based protein sources for vegetarian and vegan cooking.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop',
    author: 'Sarah Green',
    authorAvatar: 'https://i.pravatar.cc/100?img=9',
    date: '2024-01-02',
    readTime: 9,
    category: 'Vegetarian',
    featured: false,
  },
];

const categories = ['All', 'Kitchen Tips', 'Techniques', 'Seasonal', 'Meal Prep', 'Ingredients', 'Vegetarian'];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured || selectedCategory !== 'All');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Food <span className="text-primary">Blog</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in animation-delay-100">
              Cooking tips, recipes, and culinary inspiration from our community of passionate food lovers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'All' && (
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="relative rounded-2xl overflow-hidden shadow-card-xl">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                <Badge className="mb-4 bg-primary text-primary-foreground">Featured</Badge>
                <h2 className="font-display text-2xl lg:text-4xl font-bold text-primary-foreground mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-6 max-w-2xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-primary-foreground/70">
                  <div className="flex items-center gap-2">
                    <img
                      src={featuredPost.authorAvatar}
                      alt={featuredPost.author}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <article
                key={post.id}
                className="group bg-card rounded-xl overflow-hidden shadow-card-md hover:shadow-card-xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute top-3 left-3 bg-card/90 text-card-foreground">
                    <Tag className="h-3 w-3 mr-1" />
                    {post.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Get the latest recipes, cooking tips, and food inspiration delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-full sm:w-80"
              />
              <Button size="lg" className="gap-2">
                Subscribe
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;