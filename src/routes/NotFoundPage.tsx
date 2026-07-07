import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Button } from '@/components/ui/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900 p-6 text-center select-none transition-colors duration-200">
      <SEOHead title="Page Not Found" description="The page you are looking for does not exist." />
      <div className="max-w-md w-full bg-white dark:bg-dark-800 rounded-3xl border border-gray-100 dark:border-dark-700 shadow-xl p-8 flex flex-col items-center">
        <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 flex items-center justify-center mb-4.5">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Page Not Found
        </h2>
        <p className="text-xs text-gray-505 dark:text-gray-400 mb-6 max-w-xs leading-normal">
          The requested page could not be located. You may have typed the URL incorrectly, or the page has been moved.
        </p>
        <Button variant="primary" fullWidth size="lg" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={() => navigate('/')}>
          Back to Home Page
        </Button>
      </div>
    </div>
  );
};
export default NotFoundPage;
