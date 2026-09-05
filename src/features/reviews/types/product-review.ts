export type ReviewRating = 1 | 2 | 3 | 4 | 5;

export interface ReviewDistributionItem {
  rating: ReviewRating;
  count: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  authorInitial: string;
  rating: ReviewRating;
  title: string;
  content: string;
  isVerifiedBuyer: boolean;
}

export interface ProductReviews {
  productId: string;
  averageRating: number;
  totalReviews: number;
  distribution: readonly ReviewDistributionItem[];
  reviews: readonly CustomerReview[];
}
