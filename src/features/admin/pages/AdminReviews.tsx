import React, { useState } from 'react';
import { Star, Eye, Check, X } from 'lucide-react';
import { SEOHead } from '@/components/common/SEOHead';
import { Table } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/ui/StarRating';
import type { AdminReview } from '@/types';

export const AdminReviews: React.FC = () => {
  const [reviews, setReviews] = useState<AdminReview[]>([
    { id: '1', reviewerName: 'Akanksha Sharma', expertName: 'John David', rating: 5, comment: 'Rahul explained React hooks and context API brilliantly.', technology: 'React.js', isReported: false, status: 'approved', createdAt: '2026-06-29T10:00:00Z' },
    { id: '2', reviewerName: 'Vikram Singh', expertName: 'Rahul Gupta', rating: 3, comment: 'Good session, but would have preferred more time on code.', technology: 'Node.js', isReported: true, status: 'pending', createdAt: '2026-07-01T12:00:00Z' },
  ]);

  const handleApprove = (id: string) => {
    setReviews(
      reviews.map((r) => {
        if (r.id === id) {
          return { ...r, status: 'approved' };
        }
        return r;
      })
    );
  };

  const handleReject = (id: string) => {
    setReviews(
      reviews.map((r) => {
        if (r.id === id) {
          return { ...r, status: 'rejected' };
        }
        return r;
      })
    );
  };

  const columns = [
    {
      header: 'Reviewer',
      accessor: (row: AdminReview) => row.reviewerName,
    },
    {
      header: 'Expert Mentor',
      accessor: (row: AdminReview) => row.expertName,
    },
    {
      header: 'Rating',
      accessor: (row: AdminReview) => (
        <div className="flex items-center gap-1">
          <StarRating rating={row.rating} max={5} interactive={false} size={11} />
        </div>
      ),
    },
    {
      header: 'Feedback Comment',
      accessor: (row: AdminReview) => (
        <span className="text-xs text-gray-500 line-clamp-1 max-w-[200px]" title={row.comment}>
          {row.comment}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: AdminReview) => (
        <Badge variant={row.status === 'approved' ? 'success' : row.status === 'pending' ? 'warning' : 'danger'}>
          {row.status}
        </Badge>
      ),
    },
    {
      header: 'Reported',
      accessor: (row: AdminReview) => (
        <Badge variant={row.isReported ? 'danger' : 'neutral'}>
          {row.isReported ? 'Yes' : 'No'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      accessor: (row: AdminReview) => (
        <div className="flex gap-2">
          {row.status === 'pending' && (
            <>
              <Button variant="outline" size="sm" onClick={() => handleApprove(row.id)}>
                Approve
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleReject(row.id)}>
                Block
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <SEOHead title="Admin Reviews Moderation" description="Approve or block user review comments." />

      <div className="mb-8 select-none">
        <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
          Review Moderation
        </h2>
        <p className="text-xs text-gray-505 dark:text-gray-400 mt-1">
          Approve learner comments, review reported listings, and manage public ratings.
        </p>
      </div>

      <Table columns={columns} data={reviews} keyExtractor={(row) => row.id} />
    </>
  );
};
export default AdminReviews;
