import React, { useState } from 'react';
import { Star, MapPin, Award, ShieldCheck, Mail, Calendar, Clock, Globe, Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { StarRating } from '@/components/ui/StarRating';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { REVIEWS } from '@/constants/dummy-data';
import type { Expert, TimeSlot } from '@/types';

// ============================================================
// ExpertHeader
// ============================================================

interface ExpertHeaderProps {
  expert: Expert;
  onBook: () => void;
  onMessage: () => void;
}

export const ExpertHeader: React.FC<ExpertHeaderProps> = ({
  expert,
  onBook,
  onMessage,
}) => {
  return (
    <Card className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-gray-150 dark:border-dark-750">
      <div className="flex gap-4.5 items-start md:items-center">
        <Avatar src={expert.avatar} name={expert.fullName} size="xl" />
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
              {expert.fullName}
            </h2>
            {expert.isVerified && (
              <Badge variant="primary" size="sm" className="gap-0.5">
                <Award className="w-3.5 h-3.5" /> Verified Expert
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {expert.title}
          </p>
          <div className="flex flex-wrap items-center gap-4.5 text-xs text-gray-505 dark:text-gray-400 mt-3">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-400 text-amber-400 shrink-0" />
              <span className="font-bold text-gray-700 dark:text-gray-250">{expert.rating}</span>
              <span>({expert.totalReviews} reviews)</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400 shrink-0" /> {expert.location}
            </span>
            <span className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-gray-400 shrink-0" /> {expert.languages.join(', ')}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-dark-700">
        <Button variant="outline" size="md" className="flex-1 md:flex-none" onClick={onMessage}>
          Message
        </Button>
        <Button variant="primary" size="md" className="flex-1 md:flex-none" onClick={onBook}>
          Book a Session
        </Button>
      </div>
    </Card>
  );
};

// ============================================================
// ExpertBio
// ============================================================

export const ExpertBio: React.FC<{ expert: Expert }> = ({ expert }) => {
  return (
    <Card className="space-y-6 select-none">
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3.5">
          About Me
        </h3>
        <p className="text-xs text-gray-650 dark:text-gray-400 leading-relaxed font-medium">
          {expert.bio}
        </p>
      </div>

      <div className="border-t border-gray-100 dark:border-dark-700 pt-5">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-3.5">
          Education
        </h3>
        <ul className="space-y-3">
          {expert.education.map((edu, idx) => (
            <li key={idx} className="flex gap-2.5 text-xs">
              <span className="h-2 w-2 rounded-full bg-primary-550 shrink-0 mt-1.5" />
              <div>
                <p className="font-bold text-gray-805 dark:text-gray-200">{edu.degree}</p>
                <p className="text-gray-500 dark:text-gray-450 mt-0.5">{edu.institution} ({edu.year})</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

// ============================================================
// SessionPricing
// ============================================================

export const SessionPricing: React.FC<{ expert: Expert; onBook: () => void }> = ({ expert, onBook }) => {
  return (
    <Card className="flex flex-col select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-100 dark:border-dark-700 pb-3">
        Session Booking
      </h3>
      <div className="flex justify-between items-baseline mb-6">
        <span className="text-xs font-semibold text-gray-550 dark:text-gray-400">Hourly Mentoring Fee</span>
        <div className="text-right">
          <span className="text-2xl font-black text-gray-950 dark:text-white">${expert.hourlyRate}</span>
          <span className="text-[10px] text-gray-450 dark:text-gray-500 uppercase font-bold tracking-wider ml-1">/ hour</span>
        </div>
      </div>
      <div className="space-y-3 mb-6 bg-gray-50 dark:bg-dark-900 rounded-2xl p-4.5 border border-gray-150/30">
        <div className="flex gap-2.5 items-start text-xs leading-normal">
          <Shield className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
          <span className="font-medium text-gray-650 dark:text-gray-400">100% Satisfaction Guarantee. Refund available up to 4 hours before.</span>
        </div>
        <div className="flex gap-2.5 items-start text-xs leading-normal">
          <Clock className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
          <span className="font-medium text-gray-650 dark:text-gray-400">Sessions are live over HD video with collaborative code playgrounds.</span>
        </div>
      </div>
      <Button variant="primary" fullWidth size="lg" onClick={onBook}>
        Book Session Slot
      </Button>
    </Card>
  );
};

// ============================================================
// AvailabilityCalendar
// ============================================================

interface AvailabilityCalendarProps {
  expert: Expert;
  onSlotSelect?: (date: string, slot: TimeSlot) => void;
}

export const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  expert,
  onSlotSelect,
}) => {
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);

  const selectedDay = expert.availability[selectedDayIdx];

  return (
    <Card className="select-none">
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <Calendar className="w-4.5 h-4.5 text-gray-500" /> Availability
      </h3>

      <div className="flex gap-2.5 border-b border-gray-100 dark:border-dark-700 pb-4.5 mb-5 overflow-x-auto no-scrollbar">
        {expert.availability.map((avail, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDayIdx(idx)}
            className={`px-4 py-2.5 rounded-xl border flex flex-col items-center min-w-[70px] transition-all duration-150 ${
              selectedDayIdx === idx
                ? 'border-primary-600 bg-primary-600 text-white dark:border-primary-500 dark:bg-primary-500 shadow-sm'
                : 'border-gray-200 dark:border-dark-700 hover:border-gray-300 dark:hover:border-dark-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-[10px] uppercase font-semibold tracking-wider">{avail.day}</span>
            <span className="text-sm font-extrabold mt-0.5">{avail.date.split('-')[2]}</span>
          </button>
        ))}
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3.5">
          Available slots on {selectedDay?.date}
        </h4>
        {selectedDay?.slots.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {selectedDay.slots.map((slot) => (
              <button
                key={slot.id}
                disabled={!slot.available}
                onClick={() => onSlotSelect?.(selectedDay.date, slot)}
                className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all duration-150 ${
                  slot.available
                    ? 'border-gray-200 dark:border-dark-700 hover:border-primary-550 dark:hover:border-primary-400 bg-white dark:bg-dark-850 hover:bg-primary-50/10 dark:text-gray-300 dark:hover:text-primary-400 cursor-pointer active:scale-95'
                    : 'border-gray-100 dark:border-dark-800 text-gray-350 dark:text-dark-600 bg-gray-50 dark:bg-dark-900/50 cursor-not-allowed opacity-50'
                }`}
              >
                {slot.startTime}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 dark:text-gray-550">
            No slots available on this day.
          </p>
        )}
      </div>
    </Card>
  );
};
export default AvailabilityCalendar;
