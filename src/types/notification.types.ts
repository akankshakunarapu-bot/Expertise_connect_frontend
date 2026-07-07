import type { NotificationType } from './common.types';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
  actionUrl?: string;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  filter: NotificationType | 'all';
}

export interface NotificationPreferences {
  email: {
    bookingConfirmation: boolean;
    sessionReminder: boolean;
    paymentReceipt: boolean;
    newMessage: boolean;
    reviewReceived: boolean;
    promotions: boolean;
  };
  push: {
    bookingConfirmation: boolean;
    sessionReminder: boolean;
    newMessage: boolean;
    reviewReceived: boolean;
  };
  sms: {
    sessionReminder: boolean;
    bookingConfirmation: boolean;
  };
}
