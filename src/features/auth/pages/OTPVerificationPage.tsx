import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { OTPInput } from '../components/AuthComponents';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export const OTPVerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  const navigate = useNavigate();
  const { demoLogin } = useAuth();
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleComplete = (otp: string) => {
    // For demo purposes
    demoLogin();
    navigate('/role-selection');
  };

  const handleResend = () => {
    setTimer(30);
  };

  return (
    <>
      <SEOHead title="Verify OTP" description="Verify your Expertise Connect account with OTP." />
      <div className="text-center mb-8">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-primary-50 dark:bg-primary-950/20 text-primary-650 flex items-center justify-center mb-4">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Verify Your Account
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed max-w-xs mx-auto">
          We have sent a 6-digit verification code to <span className="font-semibold text-gray-800 dark:text-gray-250">{email}</span>.
        </p>
      </div>

      <div className="space-y-6">
        <OTPInput onComplete={handleComplete} />

        <div className="text-center text-xs select-none">
          {timer > 0 ? (
            <span className="text-gray-450">
              Resend OTP in <span className="font-semibold text-gray-700 dark:text-gray-300">{timer}s</span>
            </span>
          ) : (
            <button
              onClick={handleResend}
              className="font-semibold text-primary-600 dark:text-primary-400 hover:underline focus:outline-none"
            >
              Resend OTP code
            </button>
          )}
        </div>

        <Button
          variant="outline"
          fullWidth
          onClick={() => handleComplete('123456')}
          className="text-xs"
        >
          Skip / Demo Continue
        </Button>
      </div>
    </>
  );
};
export default OTPVerificationPage;
