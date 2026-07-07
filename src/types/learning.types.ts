export interface Course {
  id: string;
  title: string;
  description: string;
  expertId: string;
  expertName: string;
  expertAvatar: string;
  technology: string;
  thumbnail: string;
  totalSessions: number;
  completedSessions: number;
  progress: number;
  duration: number; // total hours
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'in_progress' | 'completed' | 'not_started';
  startedAt?: string;
  completedAt?: string;
  nextSessionDate?: string;
}

export interface Certificate {
  id: string;
  courseId: string;
  courseName: string;
  expertName: string;
  technology: string;
  issuedAt: string;
  credentialId: string;
  downloadUrl: string;
  thumbnail: string;
}

export interface LearningAchievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'sessions' | 'hours' | 'technologies' | 'streak' | 'review';
  earnedAt: string;
  progress?: number;
  target?: number;
}

export interface LearningStats {
  totalSessions: number;
  hoursLearned: number;
  technologiesLearned: number;
  certificates: number;
  currentStreak: number;
  longestStreak: number;
}

export interface LearningSession {
  id: string;
  bookingId: string;
  expertName: string;
  expertAvatar: string;
  technology: string;
  title: string;
  date: string;
  duration: number;
  rating?: number;
  notes?: string;
  recordingUrl?: string;
  status: 'completed' | 'upcoming' | 'cancelled';
}

export interface LearningState {
  courses: Course[];
  certificates: Certificate[];
  achievements: LearningAchievement[];
  stats: LearningStats | null;
  recentSessions: LearningSession[];
  isLoading: boolean;
  error: string | null;
}
