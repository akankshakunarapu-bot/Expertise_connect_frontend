import React from 'react';
import { SEOHead } from '@/components/common/SEOHead';
import {
  LearningStatsWidget,
  LearningAchievements,
  CompletedSessions,
  LearningCertificates,
} from '../components/LearningWidgets';
import { ContinueLearning } from '@/features/dashboard/components/DashboardWidgets';

export const LearningPage: React.FC = () => {
  return (
    <>
      <SEOHead title="Learning Workspace" description="Manage your course tracking, achievements, and session certificates." />

      <div className="mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Learning Workspace
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Track your progress, unlock achievements, and download certificates.
        </p>
      </div>

      <div className="space-y-8">
        {/* Statistics Overview */}
        <LearningStatsWidget />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-8">
            <ContinueLearning />
            <LearningCertificates />
            <CompletedSessions />
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <LearningAchievements />
          </div>
        </div>
      </div>
    </>
  );
};
export default LearningPage;
