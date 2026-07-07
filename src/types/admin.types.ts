import type { PaymentStatus, BookingStatus, Status } from './common.types';

export interface AdminStats {
  totalUsers: number;
  totalExperts: number;
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  newUsersThisMonth: number;
  newExpertsThisMonth: number;
  completedSessions: number;
  pendingApprovals: number;
  averageRating: number;
  userGrowth: number;      // percentage
  revenueGrowth: number;   // percentage
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: 'learner' | 'expert' | 'admin';
  status: Status;
  isVerified: boolean;
  sessionsCount: number;
  totalSpent: number;
  joinedAt: string;
  lastActive: string;
}

export interface AdminExpert {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  title: string;
  rating: number;
  totalReviews: number;
  totalSessions: number;
  totalEarnings: number;
  status: Status;
  isVerified: boolean;
  technologies: string[];
  joinedAt: string;
  lastActive: string;
}

export interface AdminBooking {
  id: string;
  learnerName: string;
  expertName: string;
  technology: string;
  date: string;
  duration: number;
  amount: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

export interface AdminPayment {
  id: string;
  transactionId: string;
  userName: string;
  expertName: string;
  amount: number;
  platformFee: number;
  expertPayout: number;
  status: PaymentStatus;
  method: string;
  date: string;
}

export interface AdminTechnology {
  id: string;
  name: string;
  slug: string;
  category: string;
  expertCount: number;
  sessionCount: number;
  status: Status;
  createdAt: string;
}

export interface AdminReview {
  id: string;
  reviewerName: string;
  expertName: string;
  rating: number;
  comment: string;
  technology: string;
  isReported: boolean;
  status: 'approved' | 'pending' | 'rejected';
  createdAt: string;
}

export interface ChartData {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

export interface UserGrowthData {
  month: string;
  learners: number;
  experts: number;
  total: number;
}

export interface AnalyticsFilters {
  dateRange: 'week' | 'month' | 'quarter' | 'year' | 'custom';
  startDate?: string;
  endDate?: string;
  technology?: string;
}
