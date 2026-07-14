import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding', { replace: true });
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-700 to-accent-700 flex items-center justify-center relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />

      <div className="flex flex-col items-center gap-6 relative z-10 animate-fade-in">
        {/* Logo */}
        <div className="h-20 w-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl animate-bounce" style={{ animationDuration: '2s' }}>
          <span className="text-4xl font-black text-white">E</span>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Expertise<span className="text-primary-200">Connect</span>
          </h1>
          <p className="text-sm text-primary-200/80 mt-2 font-medium">
            1-on-1 Live Mentoring Platform
          </p>
        </div>

        {/* Loading spinner */}
        <div className="mt-8">
          <div className="w-8 h-8 border-3 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
};
export default SplashPage;
