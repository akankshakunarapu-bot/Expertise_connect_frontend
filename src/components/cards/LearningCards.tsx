import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Award, ExternalLink, ArrowRight, BookOpen, Clock, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { formatDate } from '@/utils/formatters';
import type { Course, Certificate, Notification, Technology, Expert } from '@/types';

// ============================================================
// CourseCard
// ============================================================

interface CourseCardProps {
  course: Course;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, className }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/learning?course=${course.id}`);
  };

  return (
    <Card className={className}>
      <div className="flex justify-between items-start gap-4 mb-3">
        <Badge variant={course.status === 'completed' ? 'success' : 'primary'} size="sm" className="uppercase font-semibold tracking-wider">
          {course.status.replace('_', ' ')}
        </Badge>
        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
          {course.level}
        </span>
      </div>

      <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
        {course.title}
      </h4>
      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 h-8.5 leading-relaxed">
        {course.description}
      </p>

      <div className="flex items-center gap-2 mb-4.5 bg-gray-50 dark:bg-dark-900 rounded-xl p-2.5">
        <Avatar src={course.expertAvatar} name={course.expertName} size="xs" />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-gray-900 dark:text-gray-200 truncate">
            {course.expertName}
          </p>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
            {course.technology} Mentor
          </p>
        </div>
      </div>

      <div className="space-y-4.5 mt-auto">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.completedSessions}/{course.totalSessions} sessions</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration} hours</span>
        </div>

        <ProgressBar value={course.progress} showValue={false} size="sm" />

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-dark-700">
          <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">
            Progress: {Math.round(course.progress)}%
          </span>
          <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />} onClick={handleStart}>
            {course.status === 'completed' ? 'Review' : 'Continue'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

// ============================================================
// CertificateCard
// ============================================================

interface CertificateCardProps {
  certificate: Certificate;
  className?: string;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, className }) => {
  return (
    <Card className={className}>
      <div className="flex gap-4 items-start mb-4">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 shrink-0">
          <Award className="w-6 h-6 stroke-1.5" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
            {certificate.courseName}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
            Issued by {certificate.expertName}
          </p>
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
            Issued on {formatDate(certificate.issuedAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3.5 border-t border-gray-100 dark:border-dark-700 mt-auto">
        <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 truncate max-w-[150px]">
          ID: {certificate.credentialId}
        </span>
        <Button variant="ghost" size="sm" className="text-primary-650 dark:text-primary-400 p-0 hover:bg-transparent" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
          View/Download
        </Button>
      </div>
    </Card>
  );
};

// ============================================================
// NotificationCard
// ============================================================

interface NotificationCardProps {
  notification: Notification;
  onRead?: () => void;
  className?: string;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onRead, className }) => {
  return (
    <div
      onClick={onRead}
      className={`p-4 rounded-2xl border transition-all duration-200 flex gap-3.5 cursor-pointer bg-white dark:bg-dark-800 ${
        notification.isRead
          ? 'border-gray-100 dark:border-dark-700 opacity-75'
          : 'border-primary-100 dark:border-primary-950 bg-primary-50/10 dark:bg-primary-950/5 ring-1 ring-primary-500/5'
      } ${className}`}
    >
      <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
        notification.type === 'booking' ? 'bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500' :
        notification.type === 'payment' ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500' :
        notification.type === 'session' ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-500' :
        'bg-gray-100 dark:bg-dark-700 text-gray-500'
      }`}>
        <Award className="w-4.5 h-4.5 stroke-2" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <h4 className="text-xs font-bold text-gray-900 dark:text-gray-150">
            {notification.title}
          </h4>
          <span className="text-[10px] text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
            {formatDate(notification.createdAt, 'MMM dd, hh:mm a')}
          </span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 leading-normal">
          {notification.message}
        </p>
      </div>
      {!notification.isRead && (
        <span className="h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-500 shrink-0 mt-2" />
      )}
    </div>
  );
};

// ============================================================
// TechnologyCard
// ============================================================

interface TechnologyCardProps {
  tech: Technology;
  onClick?: () => void;
  className?: string;
}

export const TechnologyCard: React.FC<TechnologyCardProps> = ({ tech, onClick, className }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      className={`flex items-center gap-4 hover:border-primary-100 dark:hover:border-primary-900 p-4.5 ${className}`}
    >
      <div className="h-11 w-11 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-dark-900 text-2xl shrink-0">
        {tech.icon}
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
          {tech.name}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
          {tech.expertCount} Mentors
        </p>
      </div>
    </Card>
  );
};

// ============================================================
// BookmarkCard
// ============================================================

interface BookmarkCardProps {
  expert: Expert;
  onRemove?: () => void;
  className?: string;
}

export const BookmarkCard: React.FC<BookmarkCardProps> = ({ expert, onRemove, className }) => {
  const navigate = useNavigate();
  return (
    <Card
      hoverable
      onClick={() => navigate(`/expert/${expert.id}`)}
      className={`relative hover:border-primary-100 dark:hover:border-primary-900 ${className}`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove?.();
        }}
        className="absolute top-4 right-4 p-1.5 rounded-lg bg-gray-50 dark:bg-dark-700 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all border border-gray-100 dark:border-dark-600 focus:outline-none"
      >
        <Heart className="w-4 h-4 fill-current text-red-500" />
      </button>

      <div className="flex gap-3 items-center mb-3">
        <Avatar src={expert.avatar} name={expert.fullName} size="md" />
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
            {expert.fullName}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {expert.title}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {expert.technologies.slice(0, 2).map(tech => (
          <Badge key={tech.id} variant="neutral" size="sm">
            {tech.name}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-dark-700 mt-auto">
        <span className="text-xs font-bold text-gray-900 dark:text-gray-205">
          ${expert.hourlyRate}/hr
        </span>
        <Button variant="primary" size="sm" onClick={(e) => {
          e.stopPropagation();
          navigate(`/booking/${expert.id}`);
        }}>
          Book Slot
        </Button>
      </div>
    </Card>
  );
};
