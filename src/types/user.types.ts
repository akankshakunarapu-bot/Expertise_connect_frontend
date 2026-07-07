import type { UserRole, Status } from './common.types';

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  status: Status;
  isVerified: boolean;
  bio?: string;
  location?: string;
  timezone?: string;
  language?: string;
  socialLinks?: SocialLinks;
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
}

export interface UserStats {
  totalSessions: number;
  hoursLearned: number;
  sessionsCompleted: number;
  certificates: number;
  bookmarks: number;
  reviewsGiven: number;
}

export interface UpdateProfilePayload {
  fullName?: string;
  phone?: string;
  bio?: string;
  location?: string;
  timezone?: string;
  language?: string;
  avatar?: string;
  socialLinks?: SocialLinks;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
