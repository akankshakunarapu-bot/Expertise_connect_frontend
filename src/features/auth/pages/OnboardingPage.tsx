import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Video, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const ONBOARDING_SLIDES = [
  {
    icon: BookOpen,
    title: 'Learn from Top Experts',
    description: 'Connect with verified industry professionals in React, AWS, Python, DevOps, and 50+ technologies. Get personalized mentoring tailored to your career goals.',
    gradient: 'from-primary-500 to-primary-700',
    iconBg: 'bg-primary-50 dark:bg-primary-950/20 text-primary-600',
  },
  {
    icon: Video,
    title: 'Live 1-on-1 Sessions',
    description: 'Join real-time video sessions with screen sharing and live coding. Ask questions, solve problems, and learn at your own pace with dedicated mentors.',
    gradient: 'from-emerald-500 to-emerald-700',
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600',
  },
  {
    icon: Award,
    title: 'Earn Certifications',
    description: 'Complete learning paths, earn verified certificates, and showcase your skills on LinkedIn. Track your progress with detailed analytics and milestones.',
    gradient: 'from-accent-500 to-accent-700',
    iconBg: 'bg-accent-50 dark:bg-accent-950/20 text-accent-600',
  },
];

export const OnboardingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const completeOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    navigate('/', { replace: true });
  };

  const slide = ONBOARDING_SLIDES[currentSlide];
  const Icon = slide.icon;
  const isLast = currentSlide === ONBOARDING_SLIDES.length - 1;

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden transition-colors duration-200">
      {/* Background glow */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b ${slide.gradient} opacity-5 rounded-full blur-3xl transition-all duration-700`} />

      {/* Skip button */}
      {!isLast && (
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors focus:outline-none"
        >
          Skip
        </button>
      )}

      {/* Slide content */}
      <div className="flex flex-col items-center max-w-md text-center relative z-10">
        {/* Icon */}
        <div className={`h-20 w-20 rounded-3xl ${slide.iconBg} flex items-center justify-center mb-8 shadow-sm transition-all duration-500`}>
          <Icon className="w-10 h-10 stroke-[1.5]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4 transition-all duration-500">
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm transition-all duration-500">
          {slide.description}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2.5 mt-12 relative z-10">
        {ONBOARDING_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`rounded-full transition-all duration-300 focus:outline-none ${
              idx === currentSlide
                ? 'w-8 h-2.5 bg-primary-600 dark:bg-primary-500'
                : 'w-2.5 h-2.5 bg-gray-200 dark:bg-dark-700 hover:bg-gray-300 dark:hover:bg-dark-600'
            }`}
          />
        ))}
      </div>

      {/* Action button */}
      <div className="mt-10 w-full max-w-xs relative z-10">
        <Button
          variant="primary"
          fullWidth
          size="lg"
          onClick={handleNext}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {isLast ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
export default OnboardingPage;
