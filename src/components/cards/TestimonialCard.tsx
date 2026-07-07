import React from 'react';
import { Quote } from 'lucide-react';
import { Card } from '../ui/Card';
import { StarRating } from '../ui/StarRating';
import { Avatar } from '../ui/Avatar';

interface TestimonialCardProps {
  testimonial: {
    name: string;
    avatar?: string;
    role: string;
    company: string;
    content: string;
    rating: number;
  };
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  className,
}) => {
  return (
    <Card className={className}>
      <div className="flex justify-between items-start mb-4">
        <StarRating rating={testimonial.rating} max={5} interactive={false} size={15} />
        <Quote className="h-8 w-8 text-primary-200 dark:text-dark-750 stroke-1 shrink-0" />
      </div>
      <p className="text-sm text-gray-650 dark:text-gray-400 mb-6 leading-relaxed">
        "{testimonial.content}"
      </p>
      <div className="flex items-center gap-3">
        <Avatar src={testimonial.avatar} name={testimonial.name} size="sm" />
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100">
            {testimonial.name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    </Card>
  );
};
export default TestimonialCard;
