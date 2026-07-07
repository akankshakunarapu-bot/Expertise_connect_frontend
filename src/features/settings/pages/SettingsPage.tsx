import React, { useState } from 'react';
import { SEOHead } from '@/components/common/SEOHead';
import { Tabs } from '@/components/ui/Tabs';
import {
  ProfileSettings,
  PasswordSettings,
  NotificationSettings,
  ThemeSettings,
} from '../components/SettingsWidgets';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'password', label: 'Security & Password' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'theme', label: 'Appearance' },
  ];

  return (
    <>
      <SEOHead title="Account Settings" description="Manage your Expertise Connect profile details and workspace appearance." />

      <div className="mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Account Settings
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Customize your profile, configure security credentials, and toggle notification alerts.
        </p>
      </div>

      <div className="space-y-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        <div className="max-w-3xl">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'password' && <PasswordSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'theme' && <ThemeSettings />}
        </div>
      </div>
    </>
  );
};
export default SettingsPage;
