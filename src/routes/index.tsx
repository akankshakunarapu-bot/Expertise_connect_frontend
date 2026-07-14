import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { LazyLoader } from '@/components/common/LazyLoader';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';

// Layouts
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { AuthLayout } from '@/components/layout/AuthLayout';

// Lazy Loaded Pages
const LandingPage = React.lazy(() => import('@/features/landing/pages/LandingPage'));
const SplashPage = React.lazy(() => import('@/features/auth/pages/SplashPage'));
const OnboardingPage = React.lazy(() => import('@/features/auth/pages/OnboardingPage'));
const LoginPage = React.lazy(() => import('@/features/auth/pages/LoginPage'));
const SignupPage = React.lazy(() => import('@/features/auth/pages/SignupPage'));
const OTPVerificationPage = React.lazy(() => import('@/features/auth/pages/OTPVerificationPage'));
const ForgotPasswordPage = React.lazy(() => import('@/features/auth/pages/ForgotPasswordPage'));
const ResetPasswordPage = React.lazy(() => import('@/features/auth/pages/ResetPasswordPage'));
const RoleSelectionPage = React.lazy(() => import('@/features/auth/pages/RoleSelectionPage'));
const ExpertProfileSetupPage = React.lazy(() => import('@/features/auth/pages/ExpertProfileSetupPage'));
const DashboardPage = React.lazy(() => import('@/features/dashboard/pages/DashboardPage'));
const SearchPage = React.lazy(() => import('@/features/search/pages/SearchPage'));
const ExpertProfilePage = React.lazy(() => import('@/features/experts/pages/ExpertProfilePage'));
const BookingPage = React.lazy(() => import('@/features/booking/pages/BookingPage'));
const PaymentPage = React.lazy(() => import('@/features/payments/pages/PaymentPage'));
const LiveSessionPage = React.lazy(() => import('@/features/sessions/pages/LiveSessionPage'));
const MessagesPage = React.lazy(() => import('@/features/messages/pages/MessagesPage'));
const LearningPage = React.lazy(() => import('@/features/learning/pages/LearningPage'));
const NotificationsPage = React.lazy(() => import('@/features/notifications/pages/NotificationsPage'));
const ReviewsPage = React.lazy(() => import('@/features/reviews/pages/ReviewsPage'));
const SettingsPage = React.lazy(() => import('@/features/settings/pages/SettingsPage'));

// Admin pages
const AdminDashboard = React.lazy(() => import('@/features/admin/pages/AdminDashboard'));
const AdminUsers = React.lazy(() => import('@/features/admin/pages/AdminUsers'));
const AdminExperts = React.lazy(() => import('@/features/admin/pages/AdminExperts'));
const AdminTechnologies = React.lazy(() => import('@/features/admin/pages/AdminTechnologies'));
const AdminBookings = React.lazy(() => import('@/features/admin/pages/AdminBookings'));
const AdminPayments = React.lazy(() => import('@/features/admin/pages/AdminPayments'));
const AdminReviews = React.lazy(() => import('@/features/admin/pages/AdminReviews'));
const AdminAnalytics = React.lazy(() => import('@/features/admin/pages/AdminAnalytics'));
const AdminReports = React.lazy(() => import('@/features/admin/pages/AdminReports'));

const NotFoundPage = React.lazy(() => import('./NotFoundPage'));

export const router = createBrowserRouter([
  // Public Routes (General Access)
  {
    path: '/',
    element: <LazyLoader><LandingPage /></LazyLoader>,
  },
  {
    path: '/splash',
    element: <LazyLoader><SplashPage /></LazyLoader>,
  },
  {
    path: '/onboarding',
    element: <LazyLoader><OnboardingPage /></LazyLoader>,
  },
  {
    path: '/search',
    element: <LazyLoader><SearchPage /></LazyLoader>,
  },
  {
    path: '/expert/:id',
    element: <LazyLoader><ExpertProfilePage /></LazyLoader>,
  },

  // Public Gateway (Only Unauthenticated)
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LazyLoader><LoginPage /></LazyLoader> },
          { path: '/register', element: <LazyLoader><SignupPage /></LazyLoader> },
          { path: '/verify-otp', element: <LazyLoader><OTPVerificationPage /></LazyLoader> },
          { path: '/forgot-password', element: <LazyLoader><ForgotPasswordPage /></LazyLoader> },
          { path: '/reset-password', element: <LazyLoader><ResetPasswordPage /></LazyLoader> },
        ],
      },
    ],
  },

  // Protected Routes (Required Authentication)
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/role-selection',
        element: <AuthLayout />,
        children: [
          { path: '', element: <LazyLoader><RoleSelectionPage /></LazyLoader> },
        ],
      },
      // Expert profile setup (protected, no dashboard layout)
      {
        path: '/expert-profile-setup',
        element: <LazyLoader><ExpertProfileSetupPage /></LazyLoader>,
      },
      // Workspace dashboard layout routes
      {
        element: <DashboardLayout />,
        children: [
          { path: '/dashboard', element: <LazyLoader><DashboardPage /></LazyLoader> },
          { path: '/booking/:id', element: <LazyLoader><BookingPage /></LazyLoader> },
          { path: '/payment', element: <LazyLoader><PaymentPage /></LazyLoader> },
          { path: '/messages', element: <LazyLoader><MessagesPage /></LazyLoader> },
          { path: '/learning', element: <LazyLoader><LearningPage /></LazyLoader> },
          { path: '/notifications', element: <LazyLoader><NotificationsPage /></LazyLoader> },
          { path: '/reviews', element: <LazyLoader><ReviewsPage /></LazyLoader> },
          { path: '/settings', element: <LazyLoader><SettingsPage /></LazyLoader> },
        ],
      },
      // Admin dashboard layout routes
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin', element: <LazyLoader><AdminDashboard /></LazyLoader> },
          { path: '/admin/users', element: <LazyLoader><AdminUsers /></LazyLoader> },
          { path: '/admin/experts', element: <LazyLoader><AdminExperts /></LazyLoader> },
          { path: '/admin/technologies', element: <LazyLoader><AdminTechnologies /></LazyLoader> },
          { path: '/admin/bookings', element: <LazyLoader><AdminBookings /></LazyLoader> },
          { path: '/admin/payments', element: <LazyLoader><AdminPayments /></LazyLoader> },
          { path: '/admin/reviews', element: <LazyLoader><AdminReviews /></LazyLoader> },
          { path: '/admin/analytics', element: <LazyLoader><AdminAnalytics /></LazyLoader> },
          { path: '/admin/reports', element: <LazyLoader><AdminReports /></LazyLoader> },
        ],
      },
      // Full screen video layouts (no wrapper)
      {
        path: '/live-session/:id',
        element: <LazyLoader><LiveSessionPage /></LazyLoader>,
      },
    ],
  },

  // Fallback 404
  {
    path: '*',
    element: <LazyLoader><NotFoundPage /></LazyLoader>,
  },
]);

export default router;
