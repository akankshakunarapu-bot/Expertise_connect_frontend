import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Calendar, Clock, DollarSign, CreditCard, Sparkles, MapPin } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { updateFormData, nextStep, prevStep } from '@/store/slices/bookingSlice';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { EXPERTS } from '@/constants/dummy-data';
import type { TimeSlot, Expert } from '@/types';

// ============================================================
// BookingStepper
// ============================================================

export const BookingStepper: React.FC = () => {
  const { currentStep, steps } = useAppSelector((state) => state.booking);

  return (
    <div className="flex items-center justify-between max-w-3xl mx-auto mb-8 px-4 select-none">
      {steps.map((step, idx) => {
        const isCompleted = step.isCompleted;
        const isActive = step.isActive;
        return (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 border ${
                  isCompleted
                    ? 'bg-primary-600 border-primary-600 text-white dark:bg-primary-500 dark:border-primary-500 shadow-sm'
                    : isActive
                    ? 'border-primary-600 text-primary-650 bg-primary-50 dark:border-primary-500 dark:bg-primary-950/20 dark:text-primary-400 font-bold ring-4 ring-primary-500/5'
                    : 'border-gray-250 bg-white dark:border-dark-700 dark:bg-dark-800 text-gray-450 dark:text-gray-500'
                }`}
              >
                {isCompleted ? <Check className="h-4.5 w-4.5 stroke-3" /> : step.id}
              </div>
              <span className={`text-[10px] font-semibold mt-2.5 whitespace-nowrap hidden sm:block ${
                isActive ? 'text-primary-650 dark:text-primary-400 font-bold' : 'text-gray-400 dark:text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>

            {/* Link line */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-gray-200 dark:bg-dark-750 relative top-[-10px] sm:top-[-10px]">
                <div
                  className="h-full bg-primary-600 dark:bg-primary-500 transition-all duration-300"
                  style={{ width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ============================================================
// DateSelection
// ============================================================

export const DateSelection: React.FC<{ expert: Expert }> = ({ expert }) => {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.booking);

  const handleDateSelect = (date: string) => {
    dispatch(updateFormData({ date }));
    dispatch(nextStep());
  };

  return (
    <Card className="max-w-md mx-auto select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Calendar className="w-4.5 h-4.5 text-gray-500" /> Step 1: Select Session Date
      </h3>
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-3 font-semibold text-gray-500 dark:text-gray-400">
        <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
        {/* Simplified calendar month slots for July 2026 */}
        {Array.from({ length: 3 }).map((_, idx) => (
          <span key={`empty-${idx}`} className="py-2.5 opacity-0">-</span>
        ))}
        {Array.from({ length: 31 }).map((_, idx) => {
          const day = idx + 1;
          const dateStr = `2026-07-${day.toString().padStart(2, '0')}`;
          const isAvailable = expert.availability.some((a) => a.date === dateStr);
          const isSelected = formData.date === dateStr;

          return (
            <button
              key={day}
              disabled={!isAvailable}
              onClick={() => handleDateSelect(dateStr)}
              className={`py-2 rounded-xl flex flex-col items-center relative transition-all duration-150 ${
                isSelected
                  ? 'bg-primary-600 text-white dark:bg-primary-500 font-bold shadow-sm'
                  : isAvailable
                  ? 'border border-primary-100 dark:border-primary-900 bg-primary-50/10 hover:bg-primary-50 dark:hover:bg-primary-950/20 text-primary-650 dark:text-primary-400 font-bold cursor-pointer active:scale-95'
                  : 'text-gray-300 dark:text-dark-700 bg-transparent cursor-not-allowed pointer-events-none'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

// ============================================================
// TimeSelection
// ============================================================

export const TimeSelection: React.FC<{ expert: Expert }> = ({ expert }) => {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.booking);

  const selectedDayAvail = expert.availability.find((a) => a.date === formData.date);

  const handleTimeSelect = (slot: TimeSlot) => {
    dispatch(
      updateFormData({
        timeSlotId: slot.id,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })
    );
    dispatch(nextStep());
  };

  return (
    <Card className="max-w-md mx-auto select-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Clock className="w-4.5 h-4.5 text-gray-500" /> Step 2: Select Session Time
        </h3>
        <Button variant="ghost" size="sm" onClick={() => dispatch(prevStep())}>
          Back
        </Button>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-5">
        Available timeslots for <span className="font-semibold text-gray-800 dark:text-gray-250">{formData.date}</span>
      </p>

      {selectedDayAvail?.slots && selectedDayAvail.slots.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {selectedDayAvail.slots.map((slot) => (
            <button
              key={slot.id}
              disabled={!slot.available}
              onClick={() => handleTimeSelect(slot)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-bold text-center transition-all duration-150 ${
                slot.available
                  ? 'border-gray-200 dark:border-dark-700 hover:border-primary-550 dark:hover:border-primary-400 bg-white dark:bg-dark-850 hover:bg-primary-50/10 dark:text-gray-300 dark:hover:text-primary-400 cursor-pointer active:scale-95'
                  : 'border-gray-100 dark:border-dark-800 text-gray-300 dark:text-dark-600 bg-gray-50 dark:bg-dark-900/50 cursor-not-allowed opacity-50'
              }`}
            >
              {slot.startTime}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          No timeslots available for this date.
        </p>
      )}
    </Card>
  );
};

// ============================================================
// SessionConfirm
// ============================================================

export const SessionConfirm: React.FC<{ expert: Expert }> = ({ expert }) => {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.booking);
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    dispatch(updateFormData({ notes }));
    dispatch(nextStep());
  };

  return (
    <Card className="max-w-md mx-auto select-none">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Check className="w-4.5 h-4.5 text-gray-500" /> Step 3: Confirm Details
        </h3>
        <Button variant="ghost" size="sm" onClick={() => dispatch(prevStep())}>
          Back
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-dark-900 rounded-xl p-3">
          <Avatar src={expert.avatar} name={expert.fullName} size="sm" />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-200 truncate">
              {expert.fullName}
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
              {expert.title}
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between border-b border-gray-100 dark:border-dark-700/50 pb-2">
            <span className="text-gray-500 dark:text-gray-400">Date</span>
            <span className="font-semibold text-gray-900 dark:text-gray-250">{formData.date}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 dark:border-dark-700/50 pb-2">
            <span className="text-gray-500 dark:text-gray-400">Time</span>
            <span className="font-semibold text-gray-900 dark:text-gray-250">{formData.startTime}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 dark:border-dark-700/50 pb-2">
            <span className="text-gray-500 dark:text-gray-400">Duration</span>
            <span className="font-semibold text-gray-900 dark:text-gray-250">60 minutes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Session Rate</span>
            <span className="font-semibold text-gray-900 dark:text-gray-250">${expert.hourlyRate}/hour</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
            Add notes for your mentor
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Share details about what you want to learn, questions you have, or project repositories you are building..."
            className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-800 px-4.5 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/20 min-h-[90px] text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <Button variant="primary" fullWidth size="lg" onClick={handleConfirm}>
        Confirm & Go to Payment
      </Button>
    </Card>
  );
};

// ============================================================
// BookingSuccess
// ============================================================

export const BookingSuccess: React.FC<{ expert: Expert }> = ({ expert }) => {
  const { formData } = useAppSelector((state) => state.booking);
  const navigate = useNavigate();

  return (
    <Card className="max-w-md mx-auto text-center p-8 select-none">
      <div className="mx-auto h-16 w-16 rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center mb-6 border border-emerald-100 dark:border-emerald-900/50 shadow-sm animate-pulse-slow">
        <Check className="h-9 w-9 stroke-[2.5]" />
      </div>

      <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">
        Session Booked Successfully!
      </h2>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6 leading-relaxed max-w-xs mx-auto">
        Your 1-on-1 session with <span className="font-bold text-gray-905 dark:text-gray-200">{expert.fullName}</span> has been confirmed. A calendar invite has been sent to your inbox.
      </p>

      <div className="bg-gray-50 dark:bg-dark-900 rounded-2xl p-4.5 border border-gray-150/30 text-xs space-y-2 mb-8 text-left">
        <div className="flex justify-between pb-2 border-b border-gray-200/50 dark:border-dark-750">
          <span className="text-gray-500 dark:text-gray-400">Date</span>
          <span className="font-semibold text-gray-905 dark:text-gray-200">{formData.date}</span>
        </div>
        <div className="flex justify-between pb-2 border-b border-gray-200/50 dark:border-dark-750">
          <span className="text-gray-500 dark:text-gray-400">Time</span>
          <span className="font-semibold text-gray-905 dark:text-gray-200">{formData.startTime}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Meeting Room Link</span>
          <span className="font-semibold text-primary-650 dark:text-primary-400">daily.co/room/EC-john-david</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Button variant="primary" fullWidth size="lg" onClick={() => navigate('/dashboard')}>
          Go to Dashboard
        </Button>
        <Button variant="secondary" fullWidth size="lg" onClick={() => navigate('/learning')}>
          View My Sessions
        </Button>
      </div>
    </Card>
  );
};
