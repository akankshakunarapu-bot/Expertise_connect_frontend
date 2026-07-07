import type { BookingStatus, PaymentStatus } from './common.types';

export interface Booking {
  id: string;
  learnerId: string;
  learnerName: string;
  learnerAvatar?: string;
  expertId: string;
  expertName: string;
  expertAvatar?: string;
  technology: string;
  sessionType: SessionType;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  timezone: string;
  status: BookingStatus;
  amount: number;
  currency: string;
  discount?: number;
  couponCode?: string;
  paymentStatus: PaymentStatus;
  meetingLink?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type SessionType = '1-on-1' | 'group' | 'workshop' | 'mentorship';

export interface BookingFormData {
  expertId: string;
  technology: string;
  sessionType: SessionType;
  date: string;
  timeSlotId: string;
  startTime: string;
  endTime: string;
  duration: number;
  timezone: string;
  notes?: string;
  couponCode?: string;
}

export interface BookingStep {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface CouponValidation {
  isValid: boolean;
  discount: number;
  discountType: 'percentage' | 'flat';
  message: string;
}

export interface BookingSummary {
  expertName: string;
  expertAvatar: string;
  technology: string;
  sessionType: SessionType;
  date: string;
  time: string;
  duration: number;
  basePrice: number;
  discount: number;
  tax: number;
  total: number;
  currency: string;
}
