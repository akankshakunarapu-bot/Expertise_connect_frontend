import React from 'react';
import { SEOHead } from '@/components/common/SEOHead';
import { LoginForm } from '../components/AuthComponents';

export const LoginPage: React.FC = () => {
  return (
    <>
      <SEOHead title="Sign In to your account" description="Sign in to Expertise Connect learner workspace." />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome Back!
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
          Sign in to access your sessions and courses.
        </p>
      </div>
      <LoginForm />
    </>
  );
};
export default LoginPage;
