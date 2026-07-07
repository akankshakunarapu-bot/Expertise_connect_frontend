import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, ShieldAlert } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleSidebar } from '@/store/slices/dashboardSlice';
import { Sidebar } from './Sidebar';
import { ProfileDropdown } from '../navigation/ProfileDropdown';

export const AdminLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.dashboard.sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Sidebar navigation */}
      <Sidebar isAdmin />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 md:pl-64">
        {/* Top Navigation Panel */}
        <header className="h-16.5 bg-white dark:bg-dark-800 border-b border-gray-150 dark:border-dark-750 flex items-center justify-between px-6 sticky top-0 z-20 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-700/50 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none md:hidden"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-indigo-650 dark:text-indigo-400 shrink-0" />
              <h1 className="text-base font-bold text-gray-800 dark:text-gray-200">
                Administration Panel
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4.5">
            <span className="hidden sm:inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-750 dark:text-indigo-400 text-[10px] font-bold tracking-wider uppercase rounded-full px-2.5 py-0.5 border border-indigo-100 dark:border-indigo-900">
              Admin Access
            </span>
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
export default AdminLayout;
