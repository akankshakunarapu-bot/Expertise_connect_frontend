import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FAQSection,
  Newsletter,
} from '../components/LandingSections';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      navigate('/onboarding', { replace: true });
    }
  }, [navigate]);

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
        <FAQSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};
export default LandingPage;
