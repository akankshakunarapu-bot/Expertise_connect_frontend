import React, { useState } from 'react';
import { Star, MapPin, Award, Check, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { PRICE_RANGES, EXPERIENCE_LEVELS } from '@/constants';
import { LANGUAGES } from '@/constants/navigation';
import type { Expert } from '@/types';

// ============================================================
// FilterSidebar
// ============================================================

interface FilterSidebarProps {
  filters: any;
  onFilterChange: (filters: any) => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  className,
}) => {
  const [selectedLangs, setSelectedLangs] = useState<string[]>([]);
  const [selectedExps, setSelectedExps] = useState<string[]>([]);

  const handleLangToggle = (lang: string) => {
    const nextLangs = selectedLangs.includes(lang)
      ? selectedLangs.filter((l) => l !== lang)
      : [...selectedLangs, lang];
    setSelectedLangs(nextLangs);
    onFilterChange({ ...filters, languages: nextLangs });
  };

  const handleExpToggle = (exp: string) => {
    const nextExps = selectedExps.includes(exp)
      ? selectedExps.filter((e) => e !== exp)
      : [...selectedExps, exp];
    setSelectedExps(nextExps);
    onFilterChange({ ...filters, experience: nextExps });
  };

  return (
    <Card className={className}>
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-dark-700 pb-4 mb-5">
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gray-500" /> Filters
        </h4>
        <button
          onClick={() => {
            setSelectedLangs([]);
            setSelectedExps([]);
            onFilterChange({});
          }}
          className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Availability */}
        <div>
          <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
            Availability
          </h5>
          <Checkbox
            label="Available Today"
            checked={!!filters.availableToday}
            onChange={(checked) => onFilterChange({ ...filters, availableToday: checked })}
          />
        </div>

        {/* Price Range */}
        <div>
          <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
            Price Range
          </h5>
          <div className="space-y-2">
            {PRICE_RANGES.map((range, idx) => (
              <label key={idx} className="flex items-center gap-2.5 text-xs text-gray-650 dark:text-gray-400 cursor-pointer select-none">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                  onChange={() => onFilterChange({ ...filters, minPrice: range.min, maxPrice: range.max })}
                  className="rounded-full border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
            Experience
          </h5>
          <div className="space-y-2">
            {EXPERIENCE_LEVELS.map((exp) => (
              <Checkbox
                key={exp.value}
                label={exp.label}
                checked={selectedExps.includes(exp.value)}
                onChange={() => handleExpToggle(exp.value)}
              />
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <h5 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
            Languages
          </h5>
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {LANGUAGES.slice(0, 5).map((lang) => (
              <Checkbox
                key={lang}
                label={lang}
                checked={selectedLangs.includes(lang)}
                onChange={() => handleLangToggle(lang)}
              />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

// ============================================================
// ExpertListItem
// ============================================================

interface ExpertListItemProps {
  expert: Expert;
}

export const ExpertListItem: React.FC<ExpertListItemProps> = ({ expert }) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      onClick={() => navigate(`/expert/${expert.id}`)}
      className="flex flex-col sm:flex-row gap-5 items-start hover:border-primary-100 dark:hover:border-primary-900"
    >
      <Avatar src={expert.avatar} name={expert.fullName} size="xl" />
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-2">
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                {expert.fullName}
              </h3>
              {expert.isVerified && (
                <Badge variant="primary" size="sm" className="gap-0.5">
                  <Award className="w-3 h-3" /> Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              {expert.title}
            </p>
          </div>
          <div className="flex flex-row sm:flex-col sm:items-end text-left sm:text-right shrink-0">
            <span className="text-base font-black text-gray-950 dark:text-white">
              ${expert.hourlyRate}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-semibold tracking-wider sm:mt-0.5 ml-1 sm:ml-0">
              per hour
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-505 dark:text-gray-400 mb-3.5">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 text-amber-450 shrink-0" />
            <span className="font-semibold text-gray-700 dark:text-gray-250">{expert.rating}</span>
            <span>({expert.totalReviews} reviews)</span>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 shrink-0" /> {expert.location.split(',')[0]}
          </span>
          <span className="hidden sm:inline">
            {expert.experience} yrs exp
          </span>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4 h-8.5">
          {expert.bio}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {expert.technologies.map((tech) => (
            <Badge key={tech.id} variant="neutral" size="sm">
              {tech.name}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 dark:border-dark-700 pt-4 flex-wrap gap-3">
          <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-bold tracking-wide uppercase select-none">
            ✓ Available Tomorrow
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(`/expert/${expert.id}`)}>
              View Profile
            </Button>
            <Button variant="primary" size="sm" onClick={(e) => {
              e.stopPropagation();
              navigate(`/booking/${expert.id}`);
            }}>
              Book Session
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// ============================================================
// SortDropdown
// ============================================================

interface SortDropdownProps {
  value: string;
  onChange: (val: string) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-400" />
      <Select
        options={[
          { label: 'Sort by: Relevance', value: 'relevance' },
          { label: 'Price: Low to High', value: 'price_low' },
          { label: 'Price: High to Low', value: 'price_high' },
          { label: 'Expert Rating', value: 'rating' },
          { label: 'Mentoring Experience', value: 'experience' },
        ]}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-48 py-2 px-3 text-xs bg-white border-gray-200"
      />
    </div>
  );
};
