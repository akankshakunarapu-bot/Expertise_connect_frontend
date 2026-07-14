import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { toggleSidebar } from '@/store/slices/dashboardSlice';
import { useAuth } from '@/hooks/useAuth';
import { LEARNER_SIDEBAR_MENU, ADMIN_SIDEBAR_MENU } from '@/constants/navigation';
import { cn } from '@/utils/cn';

interface SidebarProps {
  isAdmin?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isAdmin = false }) => {
  const dispatch = useAppDispatch();
  const sidebarOpen = useAppSelector((state) => state.dashboard.sidebarOpen);
  const { user } = useAuth();
  const location = useLocation();

  const menuItems = isAdmin ? ADMIN_SIDEBAR_MENU : LEARNER_SIDEBAR_MENU;

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => dispatch(toggleSidebar())}
          className="fixed inset-0 z-30 bg-dark-900/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-dark-800 border-r border-gray-150 dark:border-dark-750 flex flex-col transition-all duration-300 md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Brand Header */}
        <div className="h-16.5 px-6 border-b border-gray-150 dark:border-dark-750 flex items-center shrink-0">
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
              E
            </span>
            <span className="text-base font-extrabold tracking-tight text-gray-900 dark:text-white">
              Expertise<span className="text-primary-600 dark:text-primary-400">Connect</span>
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 no-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.id}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none select-none',
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-950/20 text-primary-600 dark:text-primary-400'
                      : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-dark-700/30'
                  )
                }
              >
                {Icon && <Icon className="h-5 w-5 shrink-0 stroke-[1.8]" />}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Admin Back Link */}
        {isAdmin && (
          <div className="p-4 border-t border-gray-100 dark:border-dark-700 shrink-0">
            <Link
              to="/dashboard"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-gray-200 dark:border-dark-600 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 focus:outline-none transition-all"
            >
              <Shield className="w-3.5 h-3.5" /> Back to Learner Portal
            </Link>
          </div>
        )}

        {/* User Mini Panel */}
        {user && (
          <div className="px-6 py-4.5 border-t border-gray-100 dark:border-dark-700/50 flex items-center gap-3 shrink-0">
            <img src={user.avatar} alt={user.fullName} className="h-9 w-9 rounded-full object-cover border border-gray-200 dark:border-dark-700" />
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-900 dark:text-gray-200 truncate leading-tight">
                {user.fullName}
              </p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 capitalize truncate mt-0.5">
                {user.role} Account
              </p>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
export default Sidebar;
