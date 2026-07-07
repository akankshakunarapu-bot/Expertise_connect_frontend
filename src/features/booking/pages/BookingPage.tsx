import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { resetBooking, setStep, nextStep, prevStep } from '@/store/slices/bookingSlice';
import { SEOHead } from '@/components/common/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  BookingStepper,
  DateSelection,
  TimeSelection,
  SessionConfirm,
  BookingSuccess,
} from '../components/BookingWidgets';
import { EXPERTS } from '@/constants/dummy-data';

export const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentStep, formData } = useAppSelector((state) => state.booking);

  // Find expert
  const expert = EXPERTS.find((e) => e.id === id) || EXPERTS[0];

  useEffect(() => {
    // Reset booking state on mount
    dispatch(resetBooking());
  }, [dispatch]);

  const handlePayment = () => {
    dispatch(nextStep());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title={`Book Session with ${expert.fullName}`} description={`Book a 1-on-1 developer session with ${expert.fullName}.`} />
      <Navbar />

      <main className="flex-1 bg-gray-50 dark:bg-dark-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stepper progress */}
          {currentStep < 5 && <BookingStepper />}

          <div className="mt-8">
            {currentStep === 1 && <DateSelection expert={expert} />}
            {currentStep === 2 && <TimeSelection expert={expert} />}
            {currentStep === 3 && <SessionConfirm expert={expert} />}

            {currentStep === 4 && (
              <Card className="max-w-md mx-auto select-none">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <CreditCard className="w-4.5 h-4.5 text-gray-500" /> Step 4: Payment Selection
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => dispatch(prevStep())}>
                    Back
                  </Button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 dark:bg-dark-900 rounded-xl p-3.5 border border-dashed border-gray-200">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-505 dark:text-gray-400">Total Amount Payable</span>
                      <span className="text-base font-black text-gray-900 dark:text-white">${expert.hourlyRate}.00</span>
                    </div>
                  </div>

                  <div className="border border-primary-100 dark:border-primary-950/20 bg-primary-50/10 rounded-2xl p-4.5">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-gray-200 flex items-center gap-1.5">
                      <Sparkles className="w-4.5 h-4.5 text-amber-500" /> Razorpay Secured Checkout
                    </h4>
                    <p className="text-[10px] text-gray-500 dark:text-gray-450 mt-1 leading-normal">
                      We support credit cards, debit cards, UPI payments, net banking, and popular mobile wallets. Payouts are protected.
                    </p>
                  </div>
                </div>

                <Button variant="primary" fullWidth size="lg" onClick={handlePayment}>
                  Pay Now with Razorpay
                </Button>
              </Card>
            )}

            {currentStep === 5 && <BookingSuccess expert={expert} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default BookingPage;
