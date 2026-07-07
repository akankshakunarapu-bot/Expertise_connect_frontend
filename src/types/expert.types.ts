import type { Status, TimeSlot } from './common.types';

export interface Expert {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  avatar: string;
  title: string;
  bio: string;
  experience: number;
  hourlyRate: number;
  currency: string;
  rating: number;
  totalReviews: number;
  totalSessions: number;
  totalStudents: number;
  technologies: Technology[];
  skills: string[];
  languages: string[];
  education: Education[];
  achievements: Achievement[];
  certifications: Certification[];
  socialLinks: ExpertSocialLinks;
  availability: DayAvailability[];
  status: Status;
  isVerified: boolean;
  joinedAt: string;
  location: string;
  timezone: string;
}

export interface Technology {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  category: string;
  expertCount?: number;
}

export interface TechnologyCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  technologies: Technology[];
  expertCount: number;
}

export interface Education {
  degree: string;
  institution: string;
  year: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface ExpertSocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
  youtube?: string;
}

export interface DayAvailability {
  day: string;
  date: string;
  slots: TimeSlot[];
}

export interface ExpertSearchFilters {
  technology?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  experience?: number;
  availability?: 'today' | 'this_week' | 'this_month';
  language?: string;
  skills?: string[];
  sortBy?: 'rating' | 'price_low' | 'price_high' | 'experience' | 'reviews';
}

export interface ExpertSearchResult {
  experts: Expert[];
  totalCount: number;
  page: number;
  totalPages: number;
  filters: ExpertSearchFilters;
}
