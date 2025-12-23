/**
 * Careers Page
 * Job opportunities at TastyBites
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ChefHat, Code, Megaphone, Users } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CareersPage: React.FC = () => {
  const benefits = [
    'Competitive salary & equity',
    'Flexible work hours',
    'Remote-friendly culture',
    'Health & wellness benefits',
    'Professional development',
    'Free meals & snacks',
  ];

  const jobs = [
    {
      id: 1,
      title: 'Senior Recipe Developer',
      department: 'Content',
      location: 'Remote',
      type: 'Full-time',
      icon: ChefHat,
      description: 'Create and test delicious recipes for our growing community of home cooks.',
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      icon: Code,
      description: 'Build and maintain our recipe platform using React, Node.js, and cloud technologies.',
    },
    {
      id: 3,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY',
      type: 'Full-time',
      icon: Megaphone,
      description: 'Lead marketing initiatives to grow our community and brand awareness.',
    },
    {
      id: 4,
      title: 'Community Manager',
      department: 'Operations',
      location: 'Remote',
      type: 'Part-time',
      icon: Users,
      description: 'Engage with our community, moderate content, and foster meaningful connections.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/20 rounded-full">
              <Briefcase className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Join Our Team
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us build the future of home cooking. We're looking for passionate individuals 
            who love food and technology.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground text-center mb-8">
            Why Work With Us?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-card p-4 rounded-lg text-center shadow-sm"
              >
                <p className="text-sm font-medium text-foreground">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground text-center mb-4">
            Open Positions
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Find your perfect role and help us revolutionize the way people cook at home.
          </p>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {jobs.map((job) => (
              <div 
                key={job.id}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                    <job.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {job.title}
                      </h3>
                      <Badge variant="secondary">{job.department}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{job.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button className="w-full sm:w-auto">Apply Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Matching Role CTA */}
      <section className="py-12 lg:py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-4">
            Don't See a Matching Role?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-6">
            We're always looking for talented people. Send us your resume and tell us how you can 
            contribute to TastyBites.
          </p>
          <Link to="/contact">
            <Button variant="outline" size="lg">Contact Us</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default CareersPage;
