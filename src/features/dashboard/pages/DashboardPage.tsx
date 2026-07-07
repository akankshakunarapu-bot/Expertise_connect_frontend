import React from 'react';
import { SEOHead } from '@/components/common/SEOHead';
import {
  DashboardStats,
  UpcomingSessions,
  RecommendedExperts,
  ContinueLearning,
  RecentActivity,
  CalendarWidget,
  LearningProgress,
  QuickActions,
} from '../components/DashboardWidgets';

export const DashboardPage: React.FC = () => {
  return (
    <>
      <SEOHead title="Learner Workspace" description="Manage your lessons, certifications, and active mentoring." />

      {/* Welcome Header */}
      <div className="mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Welcome back, Akanksha! 👋
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Let's continue your developer learning journey.
        </p>
      </div>

      <div className="space-y-8">
        {/* Statistics Cards */}
        <DashboardStats />

        {/* Dashboard grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-8">
            <UpcomingSessions />
            <ContinueLearning />
            <RecommendedExperts />
          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            <CalendarWidget />
            <LearningProgress />
            <RecentActivity />
            <QuickActions />
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
