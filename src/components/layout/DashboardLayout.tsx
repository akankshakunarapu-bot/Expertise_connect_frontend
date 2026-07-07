import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, Bell } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleSidebar } from '@/store/slices/dashboardSlice';
import { Sidebar } from './Sidebar';
import { ProfileDropdown } from '../navigation/ProfileDropdown';

export const DashboardLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.dashboard.sidebarOpen);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Sidebar navigation */}
      <Sidebar />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        {/* Top Navigation Panel */}
        <header className="h-16.5 bg-white dark:bg-dark-800 border-b border-gray-150 dark:border-dark-750 flex items-center justify-between px-6 sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-700/50 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-500 md:hidden"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            <h1 className="text-base font-bold text-gray-800 dark:text-gray-200 hidden sm:block">
              Mentoring Workspace
            </h1>
          </div>

          <div className="flex items-center gap-4.5">
            {/* Notification Center Trigger */}
            <button
              onClick={() => navigate('/notifications')}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-dark-700 text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-dark-700/50 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none transition-all relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-600 dark:bg-primary-500" />
            </button>

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </header>

        {/* Dynamic Nested Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
