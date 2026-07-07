import React from 'react';
import { Check } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '@/utils/cn';

interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    period: string;
    features: string[];
    isPopular: boolean;
    cta: string;
  };
  onSelect?: () => void;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  onSelect,
  className,
}) => {
  return (
    <Card
      className={cn(
        'flex flex-col relative h-full',
        plan.isPopular
          ? 'border-2 border-primary-500 dark:border-primary-400 shadow-lg ring-4 ring-primary-500/5'
          : 'border border-gray-100 dark:border-dark-700',
        className
      )}
    >
      {plan.isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-primary-600 text-white px-3.5 py-1 text-xs font-semibold tracking-wide uppercase select-none">
          Most Popular
        </span>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
          {plan.name}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {plan.description}
        </p>
      </div>

      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          ${plan.price}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          /{plan.period}
        </span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-650 dark:text-gray-400 leading-normal">
            <Check className="h-4.5 w-4.5 text-primary-600 dark:text-primary-400 shrink-0 mt-0.5" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.isPopular ? 'primary' : 'outline'}
        fullWidth
        onClick={onSelect}
      >
        {plan.cta}
      </Button>
    </Card>
  );
};
export default PricingCard;
