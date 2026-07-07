import React, { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Card } from '@/components/ui/Card';
import { ReviewCard } from '@/components/cards/ReviewCard';
import { StarRating } from '@/components/ui/StarRating';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { REVIEWS } from '@/constants/dummy-data';

export const ReviewsPage: React.FC = () => {
  const [reviewsList, setReviewsList] = useState(REVIEWS.filter((r) => r.reviewerId === 'u1'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const handleWriteReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const added = {
        id: `rev-${Date.now()}`,
        bookingId: 'b-new',
        reviewerId: 'u1',
        reviewerName: 'Akanksha Sharma',
        reviewerAvatar: 'https://ui-avatars.com/api/?background=4F46E5&color=fff&name=Akanksha+Sharma&size=128',
        expertId: 'e3',
        expertName: 'Rahul Gupta',
        rating: newRating,
        title: newTitle,
        comment: newComment,
        technology: 'React.js',
        isVerified: true,
        helpfulCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setReviewsList([added, ...reviewsList]);
      setIsModalOpen(false);
      setNewComment('');
      setNewTitle('');
      setNewRating(5);
    }
  };

  return (
    <>
      <SEOHead title="My Reviews" description="View reviews left for experts and write new reviews." />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 select-none">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
            My Reviews & Ratings
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage feedback and rating logs you have provided for sessions.
          </p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<MessageSquare className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
          Write a Review
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Rating Breakdown sidebar */}
        <Card className="lg:col-span-1 select-none">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ratings Overview
          </h3>
          <div className="flex flex-col items-center py-4 bg-gray-50 dark:bg-dark-900 rounded-2xl border border-gray-150/30 mb-6">
            <span className="text-4xl font-extrabold text-gray-905 dark:text-white">4.8</span>
            <StarRating rating={5} max={5} interactive={false} size={18} className="mt-2" />
            <span className="text-[10px] text-gray-450 dark:text-gray-500 mt-2 font-semibold tracking-wider uppercase">Average Rating Left</span>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Rating Distribution</h4>
            <div className="space-y-2.5">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percentage = stars === 5 ? 85 : stars === 4 ? 12 : 3;
                return (
                  <div key={stars} className="flex items-center gap-3 text-xs">
                    <span className="w-3 text-right font-bold text-gray-550">{stars}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 text-amber-400 shrink-0" />
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-dark-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: `${percentage}%` }} />
                    </div>
                    <span className="w-7 text-right text-gray-400 text-[10px] font-semibold">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Reviews Grid */}
        <div className="lg:col-span-2 space-y-4">
          {reviewsList.length > 0 ? (
            reviewsList.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <Card className="text-center py-12 text-gray-505 dark:text-gray-400 select-none">
              No reviews written yet. Click 'Write a Review' to share feedback on completed sessions.
            </Card>
          )}
        </div>
      </div>

      {/* Review Submission Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Write a Session Review">
        <form onSubmit={handleWriteReview} className="space-y-5 select-none">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
              Rate Session Experience
            </label>
            <StarRating rating={newRating} max={5} interactive size={28} onChange={setNewRating} />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Review Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Summarize your experience (e.g., Outstanding explanation, Great whiteboard)..."
              className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500 text-gray-905 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Review Details
            </label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tell us what you liked about the mentoring session, what concepts were covered, how the mentor explained errors, etc..."
              className="w-full text-xs rounded-xl border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-850 px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary-500 min-h-[100px] text-gray-905 dark:text-white"
              required
            />
          </div>

          <Button type="submit" variant="primary" fullWidth size="lg" className="mt-4">
            Submit Review Feedback
          </Button>
        </form>
      </Modal>
    </>
  );
};
export default ReviewsPage;
