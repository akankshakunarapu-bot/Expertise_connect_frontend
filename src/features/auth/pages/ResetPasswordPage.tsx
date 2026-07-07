import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SEOHead } from '@/components/common/SEOHead';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';
import { PasswordStrength } from '../components/AuthComponents';
import { resetPasswordSchema } from '../schemas/auth.schema';

export const ResetPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const watchPassword = methods.watch('password', '');

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    navigate('/login');
  };

  return (
    <>
      <SEOHead title="Reset Password" description="Create a new password for Expertise Connect." />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Reset Password
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed max-w-xs mx-auto">
          Create a strong, unique password for your account.
        </p>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4.5">
          <FormField
            name="password"
            label="New Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            leftIcon={<Lock className="w-4.5 h-4.5" />}
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

          {watchPassword && <PasswordStrength value={watchPassword} />}

          <FormField
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4.5 h-4.5" />}
          />

          <Button type="submit" variant="primary" fullWidth size="lg" className="mt-2">
            Reset Password
          </Button>
        </form>
      </FormProvider>
    </>
  );
};
export default ResetPasswordPage;
