import React, { useState } from 'react';
import { ThumbsUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Avatar } from '../ui/Avatar';
import { StarRating } from '../ui/StarRating';
import { formatDate } from '@/utils/formatters';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
  onHelpfulClick?: () => void;
  className?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onHelpfulClick,
  className,
}) => {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [hasClickedHelpful, setHasClickedHelpful] = useState(false);

  const handleHelpful = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasClickedHelpful) {
      setHelpfulCount(helpfulCount + 1);
      setHasClickedHelpful(true);
      onHelpfulClick?.();
    }
  };

  return (
    <Card className={className}>
      <div className="flex justify-between items-start gap-4 mb-3.5">
        <div className="flex items-center gap-3">
          <Avatar src={review.reviewerAvatar} name={review.reviewerName} size="sm" />
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
              {review.reviewerName}
            </h4>
            <div className="flex items-center gap-2 mt-0.5">
              <StarRating rating={review.rating} max={5} interactive={false} size={13} />
              <span className="text-[10px] text-gray-400 dark:text-gray-500">
                {formatDate(review.createdAt)}
              </span>
            </div>
          </div>
        </div>
        {review.isVerified && (
          <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase select-none">
            Verified Booking
          </span>
        )}
      </div>

      <div className="mb-4">
        {review.title && (
          <h5 className="text-sm font-bold text-gray-900 dark:text-gray-150 mb-1">
            {review.title}
          </h5>
        )}
        <p className="text-xs text-gray-650 dark:text-gray-400 leading-relaxed">
          {review.comment}
        </p>
      </div>

      {review.response && (
        <div className="bg-gray-50 dark:bg-dark-900 rounded-xl p-3.5 border-l-2 border-primary-500 mb-4 ml-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-gray-900 dark:text-gray-200">
              Response from {review.expertName || 'Mentor'}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              {formatDate(review.response.createdAt)}
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            {review.response.content}
          </p>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-100 dark:border-dark-700 pt-3 mt-auto">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Technology: <span className="font-semibold text-gray-700 dark:text-gray-300">{review.technology}</span>
        </span>
        <button
          onClick={handleHelpful}
          disabled={hasClickedHelpful}
          className={`flex items-center gap-1.5 text-xs font-medium focus:outline-none transition-colors ${
            hasClickedHelpful
              ? 'text-primary-600 dark:text-primary-400 cursor-default'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5 stroke-[1.8]" />
          <span>Helpful ({helpfulCount})</span>
        </button>
      </div>
    </Card>
  );
};
export default ReviewCard;
