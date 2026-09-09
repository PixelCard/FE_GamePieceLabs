import CustomerReviewList from "@/features/reviews/components/customer-review-list";
import ReviewOverview from "@/features/reviews/components/review-overview";
import type { ProductReviews } from "@/features/reviews/types/product-review";

interface CustomerReviewsSectionProps {
  reviews: ProductReviews;
}

export default function CustomerReviewsSection({
  reviews,
}: CustomerReviewsSectionProps) {
  return (
    <section
      aria-labelledby="customer-reviews-heading"
      className="mt-20 pb-16"
    >
      <h2
        id="customer-reviews-heading"
        className="type-h1"
      >
        Customer reviews
      </h2>

      <ReviewOverview
        averageRating={reviews.averageRating}
        totalReviews={reviews.totalReviews}
        distribution={reviews.distribution}
      />
      <CustomerReviewList reviews={reviews.reviews} />
    </section>
  );
}
