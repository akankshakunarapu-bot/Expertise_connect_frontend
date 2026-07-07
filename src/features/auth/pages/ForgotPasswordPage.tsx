import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { SEOHead } from '@/components/common/SEOHead';
import { FormField } from '@/components/forms/FormField';
import { Button } from '@/components/ui/Button';
import { forgotPasswordSchema } from '../schemas/auth.schema';

export const ForgotPasswordPage: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const methods = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    setIsSent(true);
  };

  return (
    <>
      <SEOHead title="Forgot Password" description="Request a password reset link for Expertise Connect." />
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Forgot Password?
        </h2>
        <p className="text-xs text-gray-505 dark:text-gray-400 mt-1.5 leading-relaxed max-w-xs mx-auto">
          Enter your email and we'll send you a link to reset your password.
        </p>
      </div>

      {isSent ? (
        <div className="text-center space-y-6 select-none">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center">
            <Send className="h-5 w-5" />
          </div>
          <p className="text-xs text-gray-650 dark:text-gray-400 leading-normal">
            We have sent password reset instructions to your email. Please check your spam folder if you do not see it shortly.
          </p>
          <Button variant="outline" fullWidth onClick={() => navigate('/login')}>
            Back to Sign In
          </Button>
        </div>
      ) : (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              name="email"
              label="Email Address"
              placeholder="e.g. john@example.com"
              leftIcon={<Mail className="w-4.5 h-4.5" />}
            />

            <Button type="submit" variant="primary" fullWidth size="lg" className="mt-2">
              Send Reset Link
            </Button>

            <p className="text-center text-xs mt-6">
              <Link to="/login" className="inline-flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </Link>
            </p>
          </form>
        </FormProvider>
      )}
    </>
  );
};
export default ForgotPasswordPage;
