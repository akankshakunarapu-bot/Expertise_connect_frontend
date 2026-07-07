import React from 'react';
import { Award, CheckCircle, Clock, Video, Zap, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { StarRating } from '@/components/ui/StarRating';
import { CertificateCard } from '@/components/cards/LearningCards';
import { formatDate } from '@/utils/formatters';
import { LEARNING_ACHIEVEMENTS, LEARNING_SESSIONS, CERTIFICATES } from '@/constants/dummy-data';

// ============================================================
// LearningStatsWidget
// ============================================================

export const LearningStatsWidget: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 select-none">
      <Card className="flex items-center gap-4.5 p-4.5">
        <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-950/20 text-primary-600 flex items-center justify-center shrink-0">
          <Video className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold tracking-wider uppercase">Sessions</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">12</h3>
        </div>
      </Card>

      <Card className="flex items-center gap-4.5 p-4.5">
        <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 flex items-center justify-center shrink-0">
          <Clock className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold tracking-wider uppercase">Hours</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">18.5</h3>
        </div>
      </Card>

      <Card className="flex items-center gap-4.5 p-4.5">
        <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center shrink-0">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold tracking-wider uppercase">Certificates</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">4</h3>
        </div>
      </Card>

      <Card className="flex items-center gap-4.5 p-4.5">
        <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold tracking-wider uppercase">Streak</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-0.5">3 Days</h3>
        </div>
      </Card>
    </div>
  );
};

// ============================================================
// LearningAchievements
// ============================================================

export const LearningAchievements: React.FC = () => {
  return (
    <Card className="select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Award className="w-4.5 h-4.5 text-gray-500" /> Unlock Achievements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEARNING_ACHIEVEMENTS.map((act) => (
          <div key={act.id} className="flex gap-3 bg-gray-50 dark:bg-dark-900 p-3.5 rounded-2xl border border-gray-100 dark:border-dark-700/50">
            <span className="text-2xl shrink-0 mt-0.5">{act.icon}</span>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                {act.title}
              </h4>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 leading-normal">
                {act.description}
              </p>
              {act.progress !== undefined && act.target !== undefined && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1 bg-gray-250 dark:bg-dark-700 w-24 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-600 dark:bg-primary-500" style={{ width: `${(act.progress / act.target) * 100}%` }} />
                  </div>
                  <span className="text-[9px] text-gray-400">{act.progress}/{act.target}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============================================================
// CompletedSessions
// ============================================================

export const CompletedSessions: React.FC = () => {
  const completed = LEARNING_SESSIONS.filter((s) => s.status === 'completed');

  return (
    <div className="space-y-4 select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <CheckCircle className="w-4.5 h-4.5 text-gray-550" /> Completed Sessions
      </h3>
      <div className="space-y-4">
        {completed.map((sess) => (
          <Card key={sess.id} className="p-4.5">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <Avatar src={sess.expertAvatar} name={sess.expertName} size="sm" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-gray-200 leading-tight">
                    {sess.expertName}
                  </h4>
                  <p className="text-[10px] text-gray-500 mt-0.5">{sess.technology} Mentor</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-gray-400">{formatDate(sess.date)}</span>
                {sess.rating && <StarRating rating={sess.rating} max={5} interactive={false} size={11} className="mt-1" />}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// LearningCertificates
// ============================================================

export const LearningCertificates: React.FC = () => {
  return (
    <div className="space-y-4 select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
        <FileText className="w-4.5 h-4.5 text-gray-550" /> Course Certificates
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CERTIFICATES.map((cert) => (
          <CertificateCard key={cert.id} certificate={cert} />
        ))}
      </div>
    </div>
  );
};
