import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, LayoutDashboard, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Dropdown } from '../ui/Dropdown';
import { Avatar } from '../ui/Avatar';

export const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const trigger = (
    <div className="flex items-center gap-2 select-none hover:opacity-90 active:scale-[0.98] transition-all">
      <Avatar src={user.avatar} name={user.fullName} size="sm" />
      <span className="hidden sm:inline text-sm font-semibold text-gray-700 dark:text-gray-300">
        {user.fullName}
      </span>
    </div>
  );

  const menuItems = [
    {
      id: 'dashboard',
      label: (
        <span className="flex items-center gap-2.5">
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </span>
      ),
      onClick: () => navigate('/dashboard'),
    },
    {
      id: 'settings',
      label: (
        <span className="flex items-center gap-2.5">
          <Settings className="h-4 w-4" /> Settings
        </span>
      ),
      onClick: () => navigate('/settings'),
    },
    ...(user.role === 'admin'
      ? [
          {
            id: 'admin',
            label: (
              <span className="flex items-center gap-2.5 text-indigo-600 dark:text-indigo-400 font-medium">
                <Shield className="h-4 w-4" /> Admin Panel
              </span>
            ),
            onClick: () => navigate('/admin'),
          },
        ]
      : []),
    {
      id: 'logout',
      label: (
        <span className="flex items-center gap-2.5 text-red-500 hover:text-red-650 dark:hover:text-red-400 font-semibold">
          <LogOut className="h-4 w-4" /> Log Out
        </span>
      ),
      onClick: () => {
        logout();
        navigate('/');
      },
    },
  ];

  return <Dropdown trigger={trigger} items={menuItems} align="right" />;
};
export default ProfileDropdown;
