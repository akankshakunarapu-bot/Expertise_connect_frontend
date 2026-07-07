export interface Review {
  id: string;
  bookingId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  expertId: string;
  expertName: string;
  rating: number;
  title: string;
  comment: string;
  technology: string;
  isVerified: boolean;
  helpfulCount: number;
  response?: ExpertResponse;
  createdAt: string;
  updatedAt: string;
}

export interface ExpertResponse {
  content: string;
  createdAt: string;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: RatingBreakdown;
}

export interface RatingBreakdown {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface WriteReviewPayload {
  bookingId: string;
  expertId: string;
  rating: number;
  title: string;
  comment: string;
}

export interface ReviewFilters {
  rating?: number;
  technology?: string;
  sortBy?: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
}
