import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, Check, Sparkles, MessageSquare, Shield, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ExpertCard } from '@/components/cards/ExpertCard';
import { TestimonialCard } from '@/components/cards/TestimonialCard';
import { PricingCard } from '@/components/cards/PricingCard';
import { Accordion } from '@/components/ui/Accordion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { EXPERTS, TECHNOLOGIES, TECHNOLOGY_CATEGORIES, TESTIMONIALS, PRICING_PLANS, FAQS, HOW_IT_WORKS_STEPS, PLATFORM_STATS } from '@/constants/dummy-data';

// ============================================================
// HeroSection
// ============================================================

export const HeroSection: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal)}`);
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-dark-900 pt-32 pb-20 sm:pb-24 select-none">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-primary-400/10 dark:bg-primary-500/5 blur-3xl" />
        <div className="absolute top-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent-400/10 dark:bg-accent-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 dark:bg-primary-950/30 text-primary-700 dark:text-primary-400 border border-primary-100 dark:border-primary-900 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
            1-on-1 LIVE Mentoring Platform
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white leading-tight tracking-tight mb-6"
          >
            Learn the Latest <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">Technologies</span> from Top Experts
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-505 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed text-balance"
          >
            Book live sessions with industry veterans at Google, Microsoft, and Netflix. Practice live coding, system design reviews, and accelerate your engineering career.
          </motion.p>

          {/* Search bar */}
          <motion.form
            variants={itemVariants}
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto bg-white dark:bg-dark-800 p-2 rounded-2xl border border-gray-200 dark:border-dark-700 shadow-lg mb-12"
          >
            <div className="relative flex-1 flex items-center px-2">
              <Search className="h-5 w-5 text-gray-400 shrink-0 pointer-events-none" />
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search technologies (e.g., React, Node, Python)..."
                className="w-full bg-transparent border-0 py-2.5 pl-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" className="sm:px-6">
              Search
            </Button>
          </motion.form>

          {/* Platform Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200/50 dark:border-dark-800"
          >
            {PLATFORM_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-455 mt-1 font-semibold tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================================
// TrendingTechnologies
// ============================================================

export const TrendingTechnologies: React.FC = () => {
  const navigate = useNavigate();

  const handleTechClick = (slug: string) => {
    navigate(`/search?tech=${slug}`);
  };

  return (
    <section className="bg-white dark:bg-dark-800/40 py-16 sm:py-20 border-y border-gray-100 dark:border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Popular Technologies
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Explore trending frameworks and languages requested by our learners.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {TECHNOLOGIES.slice(0, 10).map((tech) => (
            <button
              key={tech.id}
              onClick={() => handleTechClick(tech.slug)}
              className="flex items-center gap-2 px-4.5 py-2.5 rounded-2xl border border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:border-primary-500 dark:hover:border-primary-500 hover:text-primary-650 transition-all select-none hover:-translate-y-0.5"
            >
              <span className="text-base">{tech.icon}</span>
              <span>{tech.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// FeaturedExperts
// ============================================================

export const FeaturedExperts: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Featured Experts
            </h2>
            <p className="text-sm text-gray-505 dark:text-gray-400 max-w-md">
              Learn from verified software engineers, architects, and research scientists.
            </p>
          </div>
          <Link to="/search" className="text-sm font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1.5 hover:underline mt-4 sm:mt-0">
            View All Mentors <ChevronRight className="w-4.5 h-4.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERTS.slice(0, 4).map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Categories
// ============================================================

export const Categories: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white dark:bg-dark-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Browse by Category
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12 max-w-md mx-auto">
          From application frameworks to infrastructure automation.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {TECHNOLOGY_CATEGORIES.map((cat) => (
            <Card
              key={cat.id}
              hoverable
              onClick={() => navigate(`/search?category=${cat.slug}`)}
              className="flex items-start gap-4"
            >
              <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-primary-50 dark:bg-primary-950/20 text-2xl shrink-0">
                {cat.icon}
              </div>
              <div className="min-w-0">
                <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
                  {cat.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1 leading-normal">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs text-primary-600 dark:text-primary-400 font-semibold mt-3 hover:underline">
                  {cat.expertCount} experts available <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// HowItWorks
// ============================================================

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-900" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          How It Works
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-16 max-w-md mx-auto">
          Get customized 1-on-1 developer coaching in 4 simple steps.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div key={step.id} className="flex flex-col items-center relative z-10 bg-gray-50 dark:bg-dark-900 p-4">
              <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-white dark:bg-dark-800 shadow-md text-3xl font-bold border border-gray-100 dark:border-dark-700/50 mb-6 relative hover:scale-105 transition-transform select-none">
                {step.icon}
                <span className="absolute -top-2.5 -right-2.5 h-6 w-6 rounded-full bg-primary-650 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                  {step.id}
                </span>
              </div>
              <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-2">
                {step.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// Testimonials
// ============================================================

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-dark-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          What Our Learners Say
        </h2>
        <p className="text-sm text-gray-505 dark:text-gray-400 mb-12 max-w-md mx-auto">
          Join thousands of developers leveling up their technical skills.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {TESTIMONIALS.map((test) => (
            <TestimonialCard key={test.id} testimonial={test} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// PricingSection
// ============================================================

export const PricingSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50 dark:bg-dark-900 border-t border-gray-100 dark:border-dark-800" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Flexible Pricing Plans
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-16 max-w-md mx-auto">
          Get started for free or upgrade to accelerate your technical skills.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left items-stretch">
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelect={() => navigate('/register')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// FAQSection
// ============================================================

export const FAQSection: React.FC = () => {
  const accordionItems = FAQS.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section className="py-20 bg-white dark:bg-dark-850">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-12">
          Have questions? We have compiled responses to popular inquiries.
        </p>
        <Accordion items={accordionItems} className="text-left" />
      </div>
    </section>
  );
};

// ============================================================
// Newsletter
// ============================================================

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-20 bg-primary-600 dark:bg-primary-950 text-white relative overflow-hidden select-none">
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary-700 to-accent-700 dark:from-primary-900 dark:to-accent-950/20 opacity-50" />
      <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Join the developer community
        </h2>
        <p className="text-sm text-primary-100 mb-8 max-w-md mx-auto leading-relaxed">
          Stay updated on trending technologies, featured guides, and discounts. No spam, cancel anytime.
        </p>

        {subscribed ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto"
          >
            <h4 className="text-lg font-bold">Thanks for subscribing! 🎉</h4>
            <p className="text-xs text-primary-150 mt-1">We have sent a confirmation message to your inbox.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-xl border border-white/20 bg-white/15 px-4.5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-primary-200"
              required
            />
            <Button type="submit" variant="secondary" size="lg">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};
