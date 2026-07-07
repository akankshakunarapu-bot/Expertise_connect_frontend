import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StarRatingProps {
  rating: number;
  max?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  interactive = false,
  onChange,
  size = 18,
  className,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (value: number) => {
    if (interactive && onChange) {
      onChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (interactive) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(null);
    }
  };

  const currentRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className={cn('flex items-center gap-1', className)} onMouseLeave={handleMouseLeave}>
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= currentRating;
        const isHalf = !isFilled && starValue - 0.5 <= currentRating;

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            disabled={!interactive}
            className={cn(
              'focus:outline-none transition-transform duration-100',
              interactive && 'hover:scale-110 cursor-pointer',
              !interactive && 'cursor-default'
            )}
          >
            <Star
              size={size}
              className={cn(
                'stroke-1.5 transition-colors duration-150',
                isFilled
                  ? 'fill-amber-400 stroke-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-400 stroke-amber-400 text-amber-400 opacity-70' // simplify half-star rendering for UI placeholder
                  : 'fill-transparent stroke-gray-300 dark:stroke-dark-500 text-gray-300 dark:text-dark-500'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
export default StarRating;
