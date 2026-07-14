import React, { useState, useEffect, useRef } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Eye, EyeOff, User, HelpCircle, Check, Info } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { FormField } from '@/components/forms/FormField';
import { FormCheckbox } from '@/components/forms/FormField';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema, signupSchema } from '../schemas/auth.schema';

// ============================================================
// SocialLoginButtons
// ============================================================

export const SocialLoginButtons: React.FC = () => {
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSocialClick = () => {
    // Simulate login
    demoLogin();
    navigate('/dashboard');
  };

  return (
    <div className="space-y-3.5 select-none">
      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-gray-150 dark:border-dark-700" />
        <span className="flex-shrink mx-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Or continue with</span>
        <div className="flex-grow border-t border-gray-150 dark:border-dark-700" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleSocialClick}
          className="flex justify-center items-center gap-2.5 px-4 py-2.5 border border-gray-250 dark:border-dark-700 rounded-xl bg-white dark:bg-dark-850 hover:bg-gray-50 dark:hover:bg-dark-750 text-sm font-semibold text-gray-700 dark:text-gray-300 focus:outline-none transition-all active:scale-[0.98]"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>

        <button
          type="button"
          onClick={handleSocialClick}
          className="flex justify-center items-center gap-2.5 px-4 py-2.5 border border-gray-255 dark:border-dark-700 rounded-xl bg-white dark:bg-dark-850 hover:bg-gray-50 dark:hover:bg-dark-750 text-sm font-semibold text-gray-700 dark:text-gray-300 focus:outline-none transition-all active:scale-[0.98]"
        >
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z"
            />
          </svg>
          GitHub
        </button>
      </div>
    </div>
  );
};

// ============================================================
// PasswordStrength
// ============================================================

export const PasswordStrength: React.FC<{ value: string }> = ({ value }) => {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let score = 0;
    if (!value) {
      setStrength(0);
      return;
    }
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    setStrength(score);
  }, [value]);

  const levels = [
    { label: 'Too Weak', color: 'bg-red-500' },
    { label: 'Weak', color: 'bg-red-400' },
    { label: 'Fair', color: 'bg-amber-400' },
    { label: 'Good', color: 'bg-emerald-450' },
    { label: 'Strong', color: 'bg-emerald-500' },
  ];

  const currentLevel = levels[strength];

  return (
    <div className="mt-3.5 select-none">
      <div className="flex items-center justify-between mb-1.5 text-xs font-semibold">
        <span className="text-gray-500 dark:text-gray-400">Password Strength:</span>
        <span className={currentLevel ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400'}>
          {currentLevel ? currentLevel.label : 'None'}
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 dark:bg-dark-700 rounded-full overflow-hidden flex gap-1">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className={`h-full flex-1 rounded-full transition-all duration-300 ${
              idx < strength ? (currentLevel ? currentLevel.color : 'bg-transparent') : 'bg-gray-200 dark:bg-dark-600'
            }`}
          />
        ))}
      </div>
      <ul className="mt-3 space-y-1">
        <li className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 dark:text-gray-400">
          <div className={`h-3 w-3 rounded-full flex items-center justify-center border text-[8px] ${value.length >= 8 ? 'bg-emerald-50 border-emerald-500 text-emerald-500' : 'border-gray-300'}`}>{value.length >= 8 ? '✓' : ''}</div>
          <span>At least 8 characters long</span>
        </li>
        <li className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 dark:text-gray-400">
          <div className={`h-3 w-3 rounded-full flex items-center justify-center border text-[8px] ${/[A-Z]/.test(value) ? 'bg-emerald-50 border-emerald-500 text-emerald-500' : 'border-gray-300'}`}>{/[A-Z]/.test(value) ? '✓' : ''}</div>
          <span>At least one uppercase letter (A-Z)</span>
        </li>
        <li className="flex items-center gap-1.5 text-[10px] font-medium text-gray-500 dark:text-gray-400">
          <div className={`h-3 w-3 rounded-full flex items-center justify-center border text-[8px] ${/[0-9]/.test(value) ? 'bg-emerald-50 border-emerald-500 text-emerald-500' : 'border-gray-300'}`}>{/[0-9]/.test(value) ? '✓' : ''}</div>
          <span>At least one number (0-9)</span>
        </li>
      </ul>
    </div>
  );
};

// ============================================================
// LoginForm
// ============================================================

export const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const methods = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  });

  const handleQuickLogin = (role: 'learner' | 'expert' | 'admin') => {
    demoLogin(role);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    const emailLower = data.email.toLowerCase();
    let role: 'learner' | 'expert' | 'admin' = 'learner';
    if (emailLower.includes('admin')) {
      role = 'admin';
    } else if (emailLower.includes('mentor') || emailLower.includes('expert') || emailLower.includes('john') || emailLower.includes('david')) {
      role = 'expert';
    }
    handleQuickLogin(role);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        {/* Quick Demo Logins */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3 select-none">
            <span className="h-px bg-gray-200 dark:bg-dark-700 w-full" />
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 px-3 uppercase tracking-wider whitespace-nowrap">
              Quick Demo Login
            </span>
            <span className="h-px bg-gray-200 dark:bg-dark-700 w-full" />
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('learner')}
              className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-2xl border border-gray-200 dark:border-dark-700 bg-gray-50/50 hover:bg-primary-50 dark:hover:bg-primary-950/20 hover:border-primary-300 dark:hover:border-primary-800 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-semibold text-xs transition-all active:scale-[0.97]"
            >
              <span className="text-lg select-none">🎓</span>
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('expert')}
              className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-2xl border border-gray-200 dark:border-dark-700 bg-gray-50/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 hover:border-emerald-300 dark:hover:border-emerald-800 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold text-xs transition-all active:scale-[0.97]"
            >
              <span className="text-lg select-none">👨‍🏫</span>
              <span>Mentor</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="flex flex-col items-center gap-1.5 py-2.5 px-2 rounded-2xl border border-gray-200 dark:border-dark-700 bg-gray-50/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 hover:border-indigo-300 dark:hover:border-indigo-800 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold text-xs transition-all active:scale-[0.97]"
            >
              <span className="text-lg select-none">🛡️</span>
              <span>Admin</span>
            </button>
          </div>
        </div>

        <FormField
          name="email"
          label="Email Address"
          placeholder="e.g. john@example.com"
          leftIcon={<Mail className="w-4.5 h-4.5" />}
        />

        <FormField
          name="password"
          label="Password"
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

        <div className="flex items-center justify-between select-none">
          <FormCheckbox name="rememberMe" label="Remember me" />
          <Link
            to="/forgot-password"
            className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" variant="primary" fullWidth size="lg" className="mt-2">
          Sign In
        </Button>

        <SocialLoginButtons />

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

// ============================================================
// SignupForm
// ============================================================

export const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { demoLogin } = useAuth();
  const navigate = useNavigate();

  const methods = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: '', email: '', password: '', confirmPassword: '', role: undefined as any, agreeToTerms: undefined },
  });

  const watchPassword = methods.watch('password', '');
  const watchRole = methods.watch('role');

  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    navigate(`/verify-otp?email=${encodeURIComponent(data.email)}&role=${data.role}`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4.5">
        <FormField
          name="fullName"
          label="Full Name"
          placeholder="e.g. John Doe"
          leftIcon={<User className="w-4.5 h-4.5" />}
        />

        <FormField
          name="email"
          label="Email Address"
          placeholder="e.g. john@example.com"
          leftIcon={<Mail className="w-4.5 h-4.5" />}
        />

        <FormField
          name="password"
          label="Password"
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
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4.5 h-4.5" />}
        />

        {/* Role Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Select Role
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => methods.setValue('role', 'learner', { shouldValidate: true })}
              className={`flex flex-col items-center gap-1.5 py-3 px-3 rounded-xl border-2 transition-all active:scale-[0.97] ${
                watchRole === 'learner'
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-950/20 text-primary-700 dark:text-primary-400'
                  : 'border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
              }`}
            >
              <span className="text-lg">🎓</span>
              <span className="text-xs font-bold">Learner</span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500">I want to learn</span>
            </button>
            <button
              type="button"
              onClick={() => methods.setValue('role', 'expert', { shouldValidate: true })}
              className={`flex flex-col items-center gap-1.5 py-3 px-3 rounded-xl border-2 transition-all active:scale-[0.97] ${
                watchRole === 'expert'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                  : 'border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800 text-gray-600 dark:text-gray-400 hover:border-gray-300'
              }`}
            >
              <span className="text-lg">👨‍🏫</span>
              <span className="text-xs font-bold">Expert</span>
              <span className="text-[10px] text-gray-400 dark:text-gray-500">I want to mentor</span>
            </button>
          </div>
          {methods.formState.errors.role && (
            <p className="text-[11px] text-red-500 mt-1.5 font-medium">{methods.formState.errors.role.message}</p>
          )}
        </div>

        <FormCheckbox name="agreeToTerms" label="I agree to the terms and privacy policy" />

        <Button type="submit" variant="primary" fullWidth size="lg" className="mt-2">
          Create Account
        </Button>

        <SocialLoginButtons />

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

// ============================================================
// OTPInput
// ============================================================

interface OTPInputProps {
  onComplete: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ onComplete }) => {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (val: string, index: number) => {
    const nextCode = [...code];
    // Filter numeric values
    const numVal = val.replace(/[^0-9]/g, '');
    nextCode[index] = numVal.slice(-1);
    setCode(nextCode);

    // Trigger complete
    const fullCode = nextCode.join('');
    if (fullCode.length === 6) {
      onComplete(fullCode);
    }

    // Auto-focus next input
    if (numVal && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
    if (pasteData.length === 6) {
      const nextCode = pasteData.split('');
      setCode(nextCode);
      onComplete(pasteData);
    }
  };

  return (
    <div className="flex justify-between gap-2.5 max-w-sm mx-auto">
      {code.map((num, idx) => (
        <input
          key={idx}
          ref={(el) => { inputsRef.current[idx] = el; }}
          type="text"
          maxLength={1}
          value={num}
          onChange={(e) => handleChange(e.target.value, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          onPaste={handlePaste}
          className="w-12 h-14 text-center text-xl font-bold border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none dark:text-white"
        />
      ))}
    </div>
  );
};
