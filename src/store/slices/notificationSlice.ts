import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Notification, NotificationType } from '@/types';
import { NOTIFICATIONS } from '@/constants/dummy-data';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  filter: NotificationType | 'all';
}

const initialState: NotificationState = {
  notifications: NOTIFICATIONS,
  unreadCount: NOTIFICATIONS.filter(n => !n.isRead).length,
  isLoading: false,
  filter: 'all',
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.isRead).length;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(n => { n.isRead = true; });
      state.unreadCount = 0;
    },
    setFilter: (state, action: PayloadAction<NotificationType | 'all'>) => {
      state.filter = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
  },
});

export const { setNotifications, markAsRead, markAllAsRead, setFilter, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
