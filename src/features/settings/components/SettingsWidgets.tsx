import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { User, Mail, Phone, Lock, Eye, EyeOff, Bell, Sun, Moon, Laptop, ShieldCheck } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/forms/FormField';
import { Toggle } from '@/components/ui/Toggle';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

// ============================================================
// ProfileSettings
// ============================================================

export const ProfileSettings: React.FC = () => {
  const { user, update } = useAuth();
  const [isSaved, setIsSaved] = useState(false);

  const schema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email'),
    phone: z.string().optional(),
    bio: z.string().optional(),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: '',
      bio: 'Senior Software Developer and technical enthusiast.',
    },
  });

  const onSubmit = (data: any) => {
    const updatedData: Partial<AuthUser> = {
      fullName: data.fullName,
    };

    if (user?.avatar?.includes('ui-avatars.com')) {
      const encodedName = encodeURIComponent(data.fullName);
      updatedData.avatar = `https://ui-avatars.com/api/?background=4F46E5&color=fff&name=${encodedName}&size=128`;
    }

    update(updatedData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <Card className="select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-105 pb-3">
        Profile Settings
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex gap-4.5 items-center mb-6">
            <img src={user?.avatar} alt={user?.fullName} className="h-16 w-16 rounded-full object-cover border border-gray-250" />
            <div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
              <p className="text-[10px] text-gray-400 mt-1.5">Max size 2MB. JPG, PNG, WEBP formats.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField name="fullName" label="Full Name" placeholder="Your full name" leftIcon={<User className="w-4 h-4" />} />
            <FormField name="email" label="Email Address" placeholder="Your email address" disabled leftIcon={<Mail className="w-4 h-4" />} />
          </div>

          <FormField name="phone" label="Phone Number" placeholder="+91 98765 43210" leftIcon={<Phone className="w-4 h-4" />} />

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
              Biography
            </label>
            <textarea
              {...methods.register('bio')}
              placeholder="Tell us about yourself..."
              className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[90px] text-gray-905 dark:text-white"
            />
          </div>

          <div className="flex justify-end pt-3 border-t border-gray-100 dark:border-dark-700 mt-6">
            <Button type="submit" variant="primary" size="md">
              {isSaved ? 'Settings Saved! ✓' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

// ============================================================
// PasswordSettings
// ============================================================

export const PasswordSettings: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const schema = z
    .object({
      currentPassword: z.string().min(1, 'Current password is required'),
      newPassword: z.string().min(8, 'New password must be at least 8 characters'),
      confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  });

  const onSubmit = () => {
    setIsSaved(true);
    methods.reset();
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <Card className="select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-105 pb-3">
        Change Password
      </h3>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="currentPassword"
            label="Current Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
          />
          <FormField
            name="newPassword"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-700 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
              </button>
            }
          />
          <FormField
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <div className="flex justify-end pt-3 border-t border-gray-100 dark:border-dark-700 mt-6">
            <Button type="submit" variant="primary" size="md">
              {isSaved ? 'Password Updated! ✓' : 'Update Password'}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Card>
  );
};

// ============================================================
// NotificationSettings
// ============================================================

export const NotificationSettings: React.FC = () => {
  const [emailConfirm, setEmailConfirm] = useState(true);
  const [emailReminder, setEmailReminder] = useState(true);
  const [pushReminder, setPushReminder] = useState(false);

  return (
    <Card className="select-none space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-105 pb-3 flex items-center gap-2">
          <Bell className="w-4.5 h-4.5 text-gray-500" /> Notifications Settings
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          Toggle channel notification settings for bookings, payments, and reminders.
        </p>

        <div className="space-y-4">
          <Toggle
            label="Email confirmation on session booking"
            checked={emailConfirm}
            onChange={setEmailConfirm}
          />
          <Toggle
            label="Email reminder starting 1 hour before session"
            checked={emailReminder}
            onChange={setEmailReminder}
          />
          <Toggle
            label="Push notification for messages and alerts"
            checked={pushReminder}
            onChange={setPushReminder}
          />
        </div>
      </div>
    </Card>
  );
};

// ============================================================
// ThemeSettings
// ============================================================

export const ThemeSettings: React.FC = () => {
  const { mode, changeTheme } = useTheme();

  return (
    <Card className="select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-105 pb-3">
        Appearance & Theme
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        Select a default appearance style for your learner workspace.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Light theme selector */}
        <button
          onClick={() => changeTheme('light')}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all select-none hover:-translate-y-0.5 active:scale-95 ${
            mode === 'light'
              ? 'border-primary-500 bg-primary-50/10 dark:bg-primary-950/20 text-primary-650 ring-2 ring-primary-500/5'
              : 'border-gray-200 dark:border-dark-700 hover:border-gray-300 dark:hover:border-dark-600 text-gray-700 dark:text-gray-400'
          }`}
        >
          <Sun className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold">Light Mode</span>
        </button>

        {/* Dark theme selector */}
        <button
          onClick={() => changeTheme('dark')}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all select-none hover:-translate-y-0.5 active:scale-95 ${
            mode === 'dark'
              ? 'border-primary-500 bg-primary-50/10 dark:bg-primary-950/20 text-primary-650 ring-2 ring-primary-500/5'
              : 'border-gray-200 dark:border-dark-700 hover:border-gray-300 dark:hover:border-dark-600 text-gray-750 dark:text-gray-400'
          }`}
        >
          <Moon className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold">Dark Mode</span>
        </button>

        {/* System theme selector */}
        <button
          onClick={() => changeTheme('system')}
          className={`p-4 rounded-2xl border flex flex-col items-center gap-3 transition-all select-none hover:-translate-y-0.5 active:scale-95 ${
            mode === 'system'
              ? 'border-primary-500 bg-primary-50/10 dark:bg-primary-950/20 text-primary-650 ring-2 ring-primary-500/5'
              : 'border-gray-200 dark:border-dark-700 hover:border-gray-300 dark:hover:border-dark-600 text-gray-750 dark:text-gray-400'
          }`}
        >
          <Laptop className="w-5 h-5 shrink-0" />
          <span className="text-xs font-bold">System Default</span>
        </button>
      </div>
    </Card>
  );
};
