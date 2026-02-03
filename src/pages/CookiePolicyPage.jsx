/**
 * Cookie Policy Page
 */

import React from 'react';
import { Layout } from '@/components/layout';

const CookiePolicyPage = () => {
  return (
    <Layout>
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Cookie Policy
            </h1>
            
            <p className="text-muted-foreground mb-6">
              Last updated: December 2024
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  What Are Cookies?
                </h2>
                <p className="text-muted-foreground">
                  Cookies are small text files that are stored on your computer or mobile device when 
                  you visit a website. They are widely used to make websites work more efficiently 
                  and to provide information to the owners of the site.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  How We Use Cookies
                </h2>
                <p className="text-muted-foreground mb-3">
                  TastyBites uses cookies for several purposes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                  <li><strong>Authentication Cookies:</strong> Keep you logged in during your session</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Types of Cookies We Use
                </h2>
                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Session Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      These are temporary cookies that expire when you close your browser. They are 
                      essential for the website to function correctly.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Persistent Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      These cookies remain on your device for a set period. They help us remember 
                      your preferences and saved recipes.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Third-Party Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      These cookies are set by third-party services like analytics providers. 
                      They help us understand site usage patterns.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Managing Cookies
                </h2>
                <p className="text-muted-foreground mb-3">
                  Most web browsers allow you to control cookies through their settings. You can:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>View what cookies are stored on your device</li>
                  <li>Delete individual cookies or all cookies</li>
                  <li>Block cookies from specific or all websites</li>
                  <li>Set your browser to notify you when a cookie is set</li>
                </ul>
                <p className="text-muted-foreground mt-3">
                  Note that blocking all cookies may affect the functionality of some websites, 
                  including TastyBites.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Updates to This Policy
                </h2>
                <p className="text-muted-foreground">
                  We may update this Cookie Policy from time to time. Any changes will be posted 
                  on this page with an updated revision date.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-muted-foreground">
                  If you have any questions about our use of cookies, please contact us at 
                  privacy@tastybites.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CookiePolicyPage;