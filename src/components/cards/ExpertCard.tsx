import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Award } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import type { Expert } from '@/types';

interface ExpertCardProps {
  expert: Expert;
  className?: string;
}

export const ExpertCard: React.FC<ExpertCardProps> = ({ expert, className }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/expert/${expert.id}`);
  };

  const handleBookSession = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/booking/${expert.id}`);
  };

  return (
    <Card
      hoverable
      onClick={handleViewProfile}
      className="flex flex-col h-full hover:border-primary-100 dark:hover:border-primary-900"
    >
      {/* Top Section */}
      <div className="flex gap-4 items-start mb-4">
        <Avatar src={expert.avatar} name={expert.fullName} size="lg" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
              {expert.fullName}
            </h3>
            {expert.isVerified && (
              <Badge variant="primary" size="sm" className="gap-0.5 select-none shrink-0">
                <Award className="w-3 h-3" /> Verified
              </Badge>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
            {expert.title}
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 text-amber-400 shrink-0" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">{expert.rating}</span>
              <span>({expert.totalReviews} reviews)</span>
            </span>
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate max-w-[100px]">{expert.location.split(',')[0]}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-xs text-gray-600 dark:text-gray-450 line-clamp-3 mb-4 leading-relaxed">
        {expert.bio}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
        {expert.technologies.slice(0, 3).map((tech) => (
          <Badge key={tech.id} variant="neutral" size="sm">
            {tech.name}
          </Badge>
        ))}
        {expert.technologies.length > 3 && (
          <Badge variant="neutral" size="sm">
            +{expert.technologies.length - 3} more
          </Badge>
        )}
      </div>

      {/* Footer Pricing & CTA */}
      <div className="border-t border-gray-100 dark:border-dark-700 pt-4 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-semibold text-gray-400 dark:text-gray-500 tracking-wide">
            Hourly Rate
          </span>
          <span className="text-base font-bold text-gray-900 dark:text-gray-150">
            ${expert.hourlyRate}/hr
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleViewProfile}>
            Profile
          </Button>
          <Button variant="primary" size="sm" onClick={handleBookSession}>
            Book
          </Button>
        </div>
      </div>
    </Card>
  );
};
export default ExpertCard;
