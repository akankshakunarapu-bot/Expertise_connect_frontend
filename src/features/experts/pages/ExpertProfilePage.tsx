import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import { Tabs } from '@/components/ui/Tabs';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { Card } from '@/components/ui/Card';
import {
  ExpertHeader,
  ExpertBio,
  SessionPricing,
  AvailabilityCalendar,
} from '../components/ExpertWidgets';
import { EXPERTS, REVIEWS } from '@/constants/dummy-data';

export const ExpertProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');

  // Find expert
  const expert = EXPERTS.find((e) => e.id === id) || EXPERTS[0];

  // Reviews for this expert
  const expertReviews = REVIEWS.filter((r) => r.expertId === expert.id);

  const tabs = [
    { id: 'about', label: 'About Mentor' },
    { id: 'reviews', label: 'Reviews', count: expertReviews.length },
    { id: 'availability', label: 'Availability Calendar' },
  ];

  const handleBook = () => {
    navigate(`/booking/${expert.id}`);
  };

  const handleMessage = () => {
    navigate(`/messages?expert=${expert.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title={`${expert.fullName} - ${expert.title}`} description={expert.bio} />
      <Navbar />

      <main className="flex-1 bg-gray-50 dark:bg-dark-900 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: 'Experts', href: '/search' },
              { label: expert.fullName },
            ]}
          />

          <div className="space-y-8 mt-2">
            {/* Header banner */}
            <ExpertHeader expert={expert} onBook={handleBook} onMessage={handleMessage} />

            {/* Profile contents */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Main Area */}
              <div className="lg:col-span-2 space-y-6">
                <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

                {activeTab === 'about' && (
                  <ExpertBio expert={expert} />
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    {expertReviews.length > 0 ? (
                      expertReviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))
                    ) : (
                      <Card className="text-center py-10 text-gray-500 dark:text-gray-400">
                        No reviews yet.
                      </Card>
                    )}
                  </div>
                )}

                {activeTab === 'availability' && (
                  <AvailabilityCalendar expert={expert} onSlotSelect={() => navigate(`/booking/${expert.id}`)} />
                )}
              </div>

              {/* Sidebar Booking Column */}
              <div className="space-y-8">
                <SessionPricing expert={expert} onBook={handleBook} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default ExpertProfilePage;
