import {
  LayoutDashboard,
  Search,
  Users,
  Calendar,
  MessageSquare,
  BookOpen,
  CreditCard,
  Bell,
  Star,
  Settings,
  Shield,
  BarChart3,
  FileText,
  Laptop,
  TrendingUp,
} from 'lucide-react';
import type { MenuItem } from '../types';

export const LEARNER_SIDEBAR_MENU: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'find-experts',
    label: 'Find Experts',
    href: '/search',
    icon: Search,
  },
  {
    id: 'my-sessions',
    label: 'My Sessions',
    href: '/dashboard',
    icon: Calendar,
  },
  {
    id: 'messages',
    label: 'Messages',
    href: '/messages',
    icon: MessageSquare,
  },
  {
    id: 'my-learning',
    label: 'My Learning',
    href: '/learning',
    icon: BookOpen,
  },
  {
    id: 'payments',
    label: 'Payments',
    href: '/payment',
    icon: CreditCard,
  },
  {
    id: 'notifications',
    label: 'Notifications',
    href: '/notifications',
    icon: Bell,
  },
  {
    id: 'reviews',
    label: 'Reviews',
    href: '/reviews',
    icon: Star,
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export const ADMIN_SIDEBAR_MENU: MenuItem[] = [
  {
    id: 'admin-dashboard',
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    id: 'admin-users',
    label: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    id: 'admin-experts',
    label: 'Experts',
    href: '/admin/experts',
    icon: Shield,
  },
  {
    id: 'admin-technologies',
    label: 'Technologies',
    href: '/admin/technologies',
    icon: Laptop,
  },
  {
    id: 'admin-bookings',
    label: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
  },
  {
    id: 'admin-payments',
    label: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
  },
  {
    id: 'admin-reviews',
    label: 'Reviews',
    href: '/admin/reviews',
    icon: Star,
  },
  {
    id: 'admin-analytics',
    label: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
  {
    id: 'admin-reports',
    label: 'Reports',
    href: '/admin/reports',
    icon: FileText,
  },
];

export const NAVBAR_MENU: MenuItem[] = [
  { id: 'explore', label: 'Explore', href: '/search' },
  { id: 'how-it-works', label: 'How It Works', href: '/#how-it-works' },
  { id: 'become-expert', label: 'Become an Expert', href: '/register' },
  { id: 'pricing', label: 'Pricing', href: '/#pricing' },
];

export const FOOTER_LINKS = {
  platform: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'Find Experts', href: '/search' },
    { label: 'Become an Expert', href: '/register' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Enterprise', href: '/#pricing' },
  ],
  resources: [
    { label: 'Help Center', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Webinars', href: '#' },
    { label: 'Documentation', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Partners', href: '#' },
    { label: 'Press', href: '#' },
  ],
  legal: [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
};

export const TRENDING_TECHNOLOGIES = [
  'React.js', 'Node.js', 'Python', 'AWS', 'TypeScript',
  'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'GraphQL',
  'Next.js', 'Flutter', 'Machine Learning', 'DevOps', 'Rust',
];

export const TECHNOLOGY_CATEGORIES = [
  { id: '1', name: 'Frontend', icon: TrendingUp, count: 150 },
  { id: '2', name: 'Backend', icon: TrendingUp, count: 120 },
  { id: '3', name: 'Mobile', icon: TrendingUp, count: 80 },
  { id: '4', name: 'DevOps', icon: TrendingUp, count: 65 },
  { id: '5', name: 'Data Science', icon: TrendingUp, count: 90 },
  { id: '6', name: 'Cloud', icon: TrendingUp, count: 75 },
  { id: '7', name: 'AI/ML', icon: TrendingUp, count: 60 },
  { id: '8', name: 'Cybersecurity', icon: TrendingUp, count: 45 },
];

export const LANGUAGES = [
  'English', 'Hindi', 'Spanish', 'French', 'German',
  'Chinese', 'Japanese', 'Korean', 'Arabic', 'Portuguese',
];

export const TIMEZONES = [
  { label: 'IST (UTC+5:30)', value: 'Asia/Kolkata' },
  { label: 'EST (UTC-5:00)', value: 'America/New_York' },
  { label: 'CST (UTC-6:00)', value: 'America/Chicago' },
  { label: 'MST (UTC-7:00)', value: 'America/Denver' },
  { label: 'PST (UTC-8:00)', value: 'America/Los_Angeles' },
  { label: 'GMT (UTC+0:00)', value: 'Europe/London' },
  { label: 'CET (UTC+1:00)', value: 'Europe/Berlin' },
  { label: 'JST (UTC+9:00)', value: 'Asia/Tokyo' },
  { label: 'AEST (UTC+10:00)', value: 'Australia/Sydney' },
  { label: 'SGT (UTC+8:00)', value: 'Asia/Singapore' },
];
