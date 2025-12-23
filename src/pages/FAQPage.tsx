/**
 * FAQ Page
 * Frequently Asked Questions
 */

import React from 'react';
import { Layout } from '@/components/layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Creating an account is simple! Click on the "Sign In" button in the top right corner, then select "Create Account". Fill in your details including your name, email address, and password. You\'ll receive a confirmation email to verify your account.',
    },
    {
      question: 'How can I submit my own recipe?',
      answer: 'Once you\'re logged in, click on "Submit Recipe" in the navigation menu. Fill out the recipe form with your dish name, ingredients, step-by-step instructions, cooking time, and upload a photo. Our team will review your submission before it goes live.',
    },
    {
      question: 'Can I save recipes to view later?',
      answer: 'Yes! When browsing recipes, click the bookmark icon on any recipe card to save it to your collection. You can access all your saved recipes from your profile page under the "Saved Recipes" tab.',
    },
    {
      question: 'How do I search for specific recipes?',
      answer: 'Use the search icon in the navigation bar to open the search dialog. You can search by recipe name, ingredients, cuisine type, or dietary preferences. Use filters to narrow down results by cooking time, difficulty level, or category.',
    },
    {
      question: 'Are the recipes free to access?',
      answer: 'Yes, all recipes on TastyBites are completely free to access. We believe delicious food should be accessible to everyone. You can browse, save, and cook any recipe without any subscription or payment.',
    },
    {
      question: 'Can I modify or adapt recipes?',
      answer: 'Absolutely! We encourage you to adapt recipes to your taste preferences and dietary needs. Many of our community members share their own variations in the comments section. Feel free to experiment and make each recipe your own.',
    },
    {
      question: 'How do I contact the TastyBites team?',
      answer: 'You can reach us through the Contact page, where you\'ll find a contact form. Alternatively, you can email us directly at support@tastybites.com. We typically respond within 24-48 hours.',
    },
    {
      question: 'Can I share recipes on social media?',
      answer: 'Yes! Each recipe page has social sharing buttons that allow you to share directly to Facebook, Twitter, Pinterest, and other platforms. You can also copy the recipe link to share anywhere you like.',
    },
    {
      question: 'How are recipes rated and reviewed?',
      answer: 'Logged-in users can rate recipes on a 5-star scale and leave written reviews. The overall rating is calculated based on all user ratings. Reviews help other cooks decide which recipes to try and provide feedback to recipe creators.',
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, TastyBites is a web-based platform optimized for mobile browsers. You can add our website to your home screen for an app-like experience. A dedicated mobile app is in development and will be available soon.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about TastyBites. Can't find what you're looking for? 
            Feel free to contact us.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FAQPage;
