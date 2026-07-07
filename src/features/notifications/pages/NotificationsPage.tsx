import React from 'react';
import { Bell, Trash2, CheckSquare } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { markAllAsRead, markAsRead, setFilter } from '@/store/slices/notificationSlice';
import { SEOHead } from '@/components/common/SEOHead';
import { NotificationCard } from '@/components/cards/LearningCards';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { NotificationType } from '@/types';

export const NotificationsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount, filter } = useAppSelector((state) => state.notifications);

  const tabs = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'booking', label: 'Bookings' },
    { id: 'payment', label: 'Payments' },
    { id: 'session', label: 'Sessions' },
  ];

  const filtered = notifications.filter((n) => {
    if (filter === 'all') return true;
    return n.type === filter;
  });

  const handleRead = (id: string) => {
    dispatch(markAsRead(id));
  };

  const handleMarkAllRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <>
      <SEOHead title="Notifications Center" description="Stay updated on booking schedules, session reminders, and chat reports." />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 select-none">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
            Notifications Center
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            You have {unreadCount} unread alerts waiting for your review.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" leftIcon={<CheckSquare className="w-4 h-4" />} onClick={handleMarkAllRead}>
            Mark All as Read
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <Tabs tabs={tabs} activeTab={filter} onChange={(id) => dispatch(setFilter(id as NotificationType | 'all'))} />

        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <NotificationCard
                key={item.id}
                notification={item}
                onRead={() => handleRead(item.id)}
              />
            ))
          ) : (
            <Card className="text-center py-12 text-gray-500 dark:text-gray-400 select-none">
              No notifications found matching your filter category.
            </Card>
          )}
        </div>
      </div>
    </>
  );
};
export default NotificationsPage;
