import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, GraduationCap, Clock, Award, Star, Video, ArrowRight, ArrowUpRight, Search } from 'lucide-react';
import { StatCard } from '@/components/cards/StatCard';
import { SessionCard } from '@/components/cards/SessionCard';
import { ExpertCard } from '@/components/cards/ExpertCard';
import { CourseCard } from '@/components/cards/LearningCards';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { EXPERTS, BOOKINGS, COURSES } from '@/constants/dummy-data';

// ============================================================
// DashboardStats
// ============================================================

export const DashboardStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
      <StatCard
        label="Upcoming Sessions"
        value={2}
        change={100}
        timeframe="vs last week"
        icon={<Calendar className="w-5 h-5" />}
      />
      <StatCard
        label="Hours Mentored"
        value="18.5"
        change={12.5}
        timeframe="vs last month"
        icon={<Clock className="w-5 h-5" />}
      />
      <StatCard
        label="Sessions Completed"
        value={12}
        change={20}
        timeframe="vs last month"
        icon={<Video className="w-5 h-5" />}
      />
      <StatCard
        label="Certificates Earned"
        value={4}
        change={0}
        timeframe="vs last month"
        icon={<Award className="w-5 h-5" />}
      />
    </div>
  );
};

// ============================================================
// UpcomingSessions
// ============================================================

export const UpcomingSessions: React.FC = () => {
  const navigate = useNavigate();
  const upcoming = BOOKINGS.filter((b) => b.status === 'confirmed').slice(0, 2);

  const handleJoinSession = (id: string) => {
    navigate(`/live-session/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center select-none">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          Upcoming Live Sessions
        </h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/learning')}>
          View Calendar
        </Button>
      </div>

      {upcoming.length > 0 ? (
        <div className="space-y-4.5">
          {upcoming.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              onJoin={() => handleJoinSession(session.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="text-center py-8 text-gray-550 dark:text-gray-400">
          No upcoming sessions booked.
        </Card>
      )}
    </div>
  );
};

// ============================================================
// RecommendedExperts
// ============================================================

export const RecommendedExperts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center select-none">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          Recommended Mentors
        </h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/search')}>
          Explore Mentors
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {EXPERTS.slice(0, 2).map((expert) => (
          <ExpertCard key={expert.id} expert={expert} />
        ))}
      </div>
    </div>
  );
};

// ============================================================
// ContinueLearning
// ============================================================

export const ContinueLearning: React.FC = () => {
  const navigate = useNavigate();
  const inProgressCourses = COURSES.filter((c) => c.status === 'in_progress').slice(0, 2);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center select-none">
        <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
          Continue Learning
        </h3>
        <Button variant="ghost" size="sm" onClick={() => navigate('/learning')}>
          All Courses
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {inProgressCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

// ============================================================
// RecentActivity
// ============================================================

export const RecentActivity: React.FC = () => {
  const activities = [
    { id: 1, title: 'Earned React Pattern Certificate', desc: 'Issued by Rahul Gupta', time: '2 days ago', type: 'award' },
    { id: 2, title: 'Session Completed with Rahul Gupta', desc: 'React.js mentoring session', time: '9 days ago', type: 'session' },
    { id: 3, title: 'Payment Receipt generated', desc: 'Receipt for $40 transaction', time: '1 week ago', type: 'payment' },
  ];

  return (
    <Card className="flex flex-col h-full select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-5 flex-1 overflow-y-auto no-scrollbar">
        {activities.map((act) => (
          <div key={act.id} className="flex gap-3">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
              act.type === 'award' ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-500' :
              act.type === 'session' ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-500' :
              'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500'
            }`}>
              {act.type === 'award' ? <Award className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
            </div>
            <div className="min-w-0">
              <h5 className="text-xs font-bold text-gray-900 dark:text-gray-200 truncate">
                {act.title}
              </h5>
              <p className="text-[10px] text-gray-450 dark:text-gray-450 mt-0.5 truncate">
                {act.desc}
              </p>
              <span className="text-[9px] text-gray-400 dark:text-gray-500 mt-1 block">
                {act.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============================================================
// CalendarWidget
// ============================================================

export const CalendarWidget: React.FC = () => {
  return (
    <Card className="flex flex-col h-full select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">
        Session Calendar
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-3 font-semibold text-gray-500 dark:text-gray-400">
        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
        {/* Placeholder rendering for July 2026 */}
        {Array.from({ length: 3 }).map((_, idx) => (
          <span key={`empty-${idx}`} className="py-1.5 opacity-0 select-none">-</span>
        ))}
        {Array.from({ length: 31 }).map((_, idx) => {
          const day = idx + 1;
          const hasSession = [11, 14].includes(day); // session date highlights
          return (
            <span
              key={day}
              className={`py-1.5 rounded-lg flex flex-col items-center relative ${
                hasSession
                  ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-650 dark:text-primary-400 font-bold border border-primary-205 dark:border-primary-900/50'
                  : 'hover:bg-gray-100 dark:hover:bg-dark-700/50 text-gray-700 dark:text-gray-300'
              }`}
            >
              {day}
              {hasSession && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-primary-600 dark:bg-primary-400" />
              )}
            </span>
          );
        })}
      </div>
    </Card>
  );
};

// ============================================================
// LearningProgress
// ============================================================

export const LearningProgress: React.FC = () => {
  return (
    <Card className="flex flex-col h-full select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">
        Learning Progress
      </h3>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Target Session Hours</span>
            <span className="text-gray-450">18.5 / 24 hrs</span>
          </div>
          <ProgressBar value={77} size="sm" showValue={false} />
        </div>
        <div>
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="font-semibold text-gray-700 dark:text-gray-300">Required Projects</span>
            <span className="text-gray-455">3 / 5 completed</span>
          </div>
          <ProgressBar value={60} size="sm" showValue={false} barClassName="from-accent-500 to-accent-600" />
        </div>
      </div>
    </Card>
  );
};

// ============================================================
// QuickActions
// ============================================================

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col h-full select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">
        Quick Shortcuts
      </h3>
      <div className="grid grid-cols-2 gap-3 flex-1">
        <button
          onClick={() => navigate('/search')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-150 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-900 hover:border-primary-500 hover:bg-white dark:hover:bg-dark-800 transition-all select-none hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Search className="w-5 h-5 text-primary-600 dark:text-primary-400 mb-2 shrink-0" />
          <span className="text-[11px] font-bold text-gray-900 dark:text-gray-200">Find Expert</span>
        </button>

        <button
          onClick={() => navigate('/learning')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl border border-gray-150 dark:border-dark-700 bg-gray-50/50 dark:bg-dark-900 hover:border-primary-500 hover:bg-white dark:hover:bg-dark-800 transition-all select-none hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mb-2 shrink-0" />
          <span className="text-[11px] font-bold text-gray-900 dark:text-gray-200">Learning Portal</span>
        </button>
      </div>
    </Card>
  );
};
