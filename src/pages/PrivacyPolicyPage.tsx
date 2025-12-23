/**
 * Privacy Policy Page
 */

import React from 'react';
import { Layout } from '@/components/layout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout>
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-neutral dark:prose-invert">
            <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-8">
              Privacy Policy
            </h1>
            
            <p className="text-muted-foreground mb-6">
              Last updated: December 2024
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground mb-4">
              We collect information you provide directly to us, such as when you create an account, 
              submit a recipe, post comments, or contact us. This may include your name, email address, 
              profile picture, and any other information you choose to provide.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or otherwise transfer your personal information to outside parties. 
              This does not include trusted third parties who assist us in operating our website, 
              conducting our business, or servicing you.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              4. Data Security
            </h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate security measures to protect your personal information. 
              However, no method of transmission over the Internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              5. Cookies
            </h2>
            <p className="text-muted-foreground mb-4">
              We use cookies to enhance your experience on our site. Cookies are small files that 
              a site transfers to your computer's hard drive through your web browser that enables 
              the site to recognize your browser and remember certain information.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              6. Your Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              You have the right to access, update, or delete your personal information at any time. 
              You can do this through your account settings or by contacting us directly.
            </p>

            <h2 className="font-display text-xl font-semibold text-foreground mt-8 mb-4">
              7. Contact Us
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy, please contact us at 
              privacy@tastybites.com.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicyPage;
