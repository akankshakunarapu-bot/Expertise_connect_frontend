import React from 'react';
import { SEOHead } from '@/components/common/SEOHead';
import { SignupForm } from '../components/AuthComponents';

export const SignupPage: React.FC = () => {
  return (
    <>
      <SEOHead title="Create Your Account" description="Sign up to start learning from top software experts." />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Your Account
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
          Join thousands of learners accelerating their careers.
        </p>
      </div>
      <SignupForm />
    </>
  );
};
export default SignupPage;
