import React from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { formatDate, formatTime } from '@/utils/formatters';
import type { Booking } from '@/types';

interface SessionCardProps {
  session: Booking;
  onJoin?: () => void;
  onCancel?: () => void;
  className?: string;
}

export const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onJoin,
  onCancel,
  className,
}) => {
  const isUpcoming = session.status === 'confirmed';
  const isLive = session.status === 'confirmed'; // simple check for demo purposes
  const isCompleted = session.status === 'completed';

  const statusVariants: Record<string, 'primary' | 'success' | 'warning' | 'danger' | 'neutral'> = {
    pending: 'warning',
    confirmed: 'success',
    completed: 'neutral',
    cancelled: 'danger',
  };

  return (
    <Card className={className}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-105 dark:border-dark-700 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <Avatar src={session.expertAvatar} name={session.expertName} size="md" />
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {session.expertName}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {session.technology} mentoring session
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={statusVariants[session.status] || 'neutral'}>
            {session.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{formatDate(session.date, 'EEEE, MMM dd, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 text-gray-400 shrink-0" />
          <span>{session.startTime} ({session.duration} mins)</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
          <Video className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="truncate max-w-[200px]">
            {session.meetingLink ? 'Daily.co Meeting Room' : 'Link will be available before start'}
          </span>
        </div>
      </div>

      {isUpcoming && (
        <div className="flex justify-end gap-2.5">
          {onCancel && (
            <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20" onClick={onCancel}>
              Cancel Session
            </Button>
          )}
          <Button
            variant={isLive ? 'primary' : 'outline'}
            size="sm"
            leftIcon={<Video className="w-4 h-4" />}
            onClick={onJoin}
          >
            {isLive ? 'Join Room' : 'Start Session'}
          </Button>
        </div>
      )}
    </Card>
  );
};
export default SessionCard;
