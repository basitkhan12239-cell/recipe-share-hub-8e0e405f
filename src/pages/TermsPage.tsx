/**
 * Terms of Service Page
 */

import React from 'react';
import { Layout } from '@/components/layout';

const TermsPage: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Terms of Service
            </h1>
            
            <p className="text-muted-foreground mb-6">
              Last updated: December 2024
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground">
                  By accessing and using TastyBites, you accept and agree to be bound by these Terms 
                  of Service. If you do not agree to these terms, please do not use our service.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  2. Use of Service
                </h2>
                <p className="text-muted-foreground mb-3">
                  You agree to use TastyBites only for lawful purposes and in accordance with these Terms. 
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Use the service in any way that violates any applicable laws</li>
                  <li>Post any content that is harmful, offensive, or inappropriate</li>
                  <li>Attempt to gain unauthorized access to any part of the service</li>
                  <li>Use automated systems to access the service without permission</li>
                  <li>Interfere with or disrupt the service or servers</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  3. User Content
                </h2>
                <p className="text-muted-foreground">
                  You retain ownership of any content you submit to TastyBites. By posting content, 
                  you grant us a non-exclusive, worldwide, royalty-free license to use, display, 
                  and distribute your content in connection with the service.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  4. Account Responsibilities
                </h2>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account credentials 
                  and for all activities that occur under your account. Please notify us immediately 
                  of any unauthorized use of your account.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  5. Intellectual Property
                </h2>
                <p className="text-muted-foreground">
                  The TastyBites service, including its original content, features, and functionality, 
                  is owned by TastyBites and is protected by international copyright, trademark, 
                  and other intellectual property laws.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  6. Disclaimer
                </h2>
                <p className="text-muted-foreground">
                  TastyBites is provided "as is" without warranties of any kind. We do not guarantee 
                  that recipes will produce specific results. Always use caution when cooking and 
                  check for food allergies.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-muted-foreground">
                  TastyBites shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages arising from your use of the service.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  8. Changes to Terms
                </h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these terms at any time. We will notify users of 
                  any material changes by posting the new terms on this page.
                </p>
              </div>

              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  9. Contact Information
                </h2>
                <p className="text-muted-foreground">
                  For any questions about these Terms of Service, please contact us at 
                  legal@tastybites.com.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsPage;
