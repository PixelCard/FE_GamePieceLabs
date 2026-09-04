import ReviewStars from "@/features/reviews/components/review-stars";
import type { CustomerReview } from "@/features/reviews/types/product-review";

interface CustomerReviewListProps {
  reviews: readonly CustomerReview[];
}

export default function CustomerReviewList({
  reviews,
}: CustomerReviewListProps) {
  return (
    <div className="divide-y divide-neutral-300">
      {reviews.map((review) => (
        <article
          key={review.id}
          className="grid gap-6 py-10 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-12"
        >
          <div className="flex items-center gap-3 md:items-start">
            <span
              aria-hidden="true"
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 font-bold text-white"
            >
              {review.authorInitial}
            </span>
            <div>
              <h3 className="font-bold">{review.author}</h3>
              {review.isVerifiedBuyer && (
                <p className="text-xs text-neutral-500">Verified buyer</p>
              )}
            </div>
          </div>

          <div>
            <ReviewStars
              rating={review.rating}
              label={`${review.rating} out of 5 stars`}
            />
            <h4 className="mt-4 text-lg font-bold">{review.title}</h4>
            <p className="mt-3 max-w-3xl leading-7 text-neutral-700">
              {review.content}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
