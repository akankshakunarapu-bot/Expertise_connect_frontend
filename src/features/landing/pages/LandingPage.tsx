import React from 'react';
import { SEOHead } from '@/components/common/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  HeroSection,
  TrendingTechnologies,
  FeaturedExperts,
  Categories,
  HowItWorks,
  Testimonials,
  PricingSection,
  FAQSection,
  Newsletter,
} from '../components/LandingSections';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Learn the Latest Technologies from Top Experts"
        description="Book 1-on-1 live mentoring sessions with verified experts in React, Node, AWS, Python, and more."
      />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrendingTechnologies />
        <FeaturedExperts />
        <Categories />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <FAQSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};
export default LandingPage;
