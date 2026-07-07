export const APP_NAME = 'Expertise Connect';
export const APP_TAGLINE = 'Learn the Latest Technologies from Top Experts';
export const APP_DESCRIPTION = 'Book one-on-one live sessions with verified experts and accelerate your skills.';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';
export const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
export const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_placeholder';
export const DAILY_API_KEY = import.meta.env.VITE_DAILY_API_KEY || '';

export const TOKEN_KEY = 'expertise_connect_token';
export const REFRESH_TOKEN_KEY = 'expertise_connect_refresh_token';
export const THEME_KEY = 'expertise_connect_theme';
export const USER_KEY = 'expertise_connect_user';

export const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?background=4F46E5&color=fff&name=';
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const SESSION_DURATIONS = [
  { label: '30 minutes', value: 30 },
  { label: '45 minutes', value: 45 },
  { label: '1 hour', value: 60 },
  { label: '1.5 hours', value: 90 },
  { label: '2 hours', value: 120 },
];

export const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export const EXPERIENCE_LEVELS = [
  { label: '1-3 years', value: '1-3' },
  { label: '3-5 years', value: '3-5' },
  { label: '5-10 years', value: '5-10' },
  { label: '10+ years', value: '10+' },
];

export const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { label: '₹2000 - ₹5000', min: 2000, max: 5000 },
  { label: '₹5000+', min: 5000, max: Infinity },
];
