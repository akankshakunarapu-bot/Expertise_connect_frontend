import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex flex-col md:flex-row transition-colors duration-200">
      {/* Back button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-10 p-2.5 rounded-xl bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-250 flex items-center gap-1.5 shadow-xs focus:outline-none transition-all active:scale-[0.98]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-xs font-semibold">Back to Home</span>
      </Link>

      {/* Left side: Branding/Taglines (Only on desktop) */}
      <div className="hidden md:flex md:w-5/12 bg-gradient-to-tr from-primary-600 to-accent-700 dark:from-primary-750 dark:to-accent-950 p-12 flex-col justify-between text-white relative overflow-hidden select-none">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

        <div className="flex items-center gap-2.5 relative z-10">
          <span className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-xl border border-white/15">
            E
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Expertise<span className="text-primary-200">Connect</span>
          </span>
        </div>

        <div className="relative z-10 max-w-sm mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight leading-tight mb-4 text-balance">
            Learn directly from verified industry leaders.
          </h2>
          <p className="text-sm text-primary-100 leading-relaxed">
            Accelerate your developer skills with customized 1-on-1 sessions. Unlock certifications, live coding environments, and verified career guidance.
          </p>
        </div>

        <div className="relative z-10 text-[10px] text-primary-200">
          &copy; {new Date().getFullYear()} Expertise Connect. All rights reserved.
        </div>
      </div>

      {/* Right side: Forms */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-md p-8 relative z-10 mt-16 md:mt-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
