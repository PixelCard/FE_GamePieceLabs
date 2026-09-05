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
        className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
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
