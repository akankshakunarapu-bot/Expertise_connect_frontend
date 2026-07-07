import React, { Suspense } from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface LazyLoaderProps {
  children: React.ReactNode;
}

export const LazyLoader: React.FC<LazyLoaderProps> = ({ children }) => {
  return (
    <Suspense
      fallback={
        <div className="flex-1 min-h-[50vh] flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
export default LazyLoader;
