/**
 * About Page
 * Information about TastyBites and the team
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Users, Heart, Award, BookOpen, Utensils } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';

const AboutPage: React.FC = () => {
  const stats = [
    { icon: BookOpen, value: '1000+', label: 'Recipes' },
    { icon: Users, value: '50K+', label: 'Community Members' },
    { icon: ChefHat, value: '200+', label: 'Expert Chefs' },
    { icon: Heart, value: '500K+', label: 'Recipes Saved' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Food',
      description: 'We believe cooking is an art form that brings people together and creates lasting memories.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Our platform thrives on the diverse recipes and stories shared by food lovers worldwide.',
    },
    {
      icon: Award,
      title: 'Quality Content',
      description: 'Every recipe is tested and reviewed to ensure you get the best cooking experience.',
    },
    {
      icon: Utensils,
      title: 'Easy to Follow',
      description: 'Step-by-step instructions make cooking accessible for beginners and experts alike.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Head Chef',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      bio: 'Culinary school graduate with 15 years of restaurant experience.',
    },
    {
      name: 'Michael Chen',
      role: 'Recipe Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      bio: 'Specializes in Asian fusion and healthy meal prep recipes.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      bio: 'Passionate about connecting food lovers and building community.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/20 rounded-full">
              <ChefHat className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
            About TastyBites
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to make home cooking accessible, enjoyable, and delicious for everyone. 
            Join our community of food lovers and discover recipes that inspire.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-xl shadow-sm">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="font-display text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                TastyBites started in 2020 as a simple idea: create a platform where home cooks could share 
                their favorite recipes and connect with others who share their passion for food.
              </p>
              <p>
                What began as a small blog has grown into a thriving community of food enthusiasts from 
                around the world. From traditional family recipes passed down through generations to 
                innovative fusion dishes, our platform celebrates the diversity of global cuisine.
              </p>
              <p>
                Today, we're proud to be a trusted resource for millions of home cooks looking for 
                inspiration, guidance, and connection through the joy of cooking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-card p-6 rounded-xl shadow-sm">
                <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            The passionate food lovers behind TastyBites who work tirelessly to bring you the best recipes.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-card shadow-lg"
                />
                <h3 className="font-display text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Join Our Community
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Share your recipes, discover new favorites, and connect with food lovers from around the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/recipes">
              <Button size="lg">Browse Recipes</Button>
            </Link>
            <Link to="/submit">
              <Button size="lg" variant="outline">Submit a Recipe</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
