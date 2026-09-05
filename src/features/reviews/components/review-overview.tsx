import { Button } from "@/components/ui/button";
import ReviewStars from "@/features/reviews/components/review-stars";
import type {
  ReviewDistributionItem,
} from "@/features/reviews/types/product-review";

interface ReviewOverviewProps {
  averageRating: number;
  totalReviews: number;
  distribution: readonly ReviewDistributionItem[];
}

export default function ReviewOverview({
  averageRating,
  totalReviews,
  distribution,
}: ReviewOverviewProps) {
  return (
    <div className="mt-10 grid gap-10 border-y border-neutral-300 py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-20">
      <div className="w-full max-w-2xl space-y-4">
        {distribution.map(({ rating, count }) => {
          const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
          const ratingLabel = `${rating} ${rating === 1 ? "star" : "stars"}`;

          return (
            <div
              key={rating}
              className="grid grid-cols-[4rem_minmax(0,1fr)_2rem] items-center gap-4 text-sm"
            >
              <span className="font-semibold">{ratingLabel}</span>
              <div
                role="progressbar"
                aria-label={`${count} of ${totalReviews} reviews are ${ratingLabel}`}
                aria-valuemin={0}
                aria-valuemax={totalReviews}
                aria-valuenow={count}
                className="h-2.5 overflow-hidden rounded-full bg-neutral-300"
              >
                <div
                  className="h-full rounded-full bg-red-700"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-right text-neutral-600">{count}</span>
            </div>
          );
        })}
      </div>

      <div className="lg:min-w-64 lg:text-center">
        <p className="text-4xl font-extrabold">{averageRating.toFixed(1)}</p>
        <ReviewStars
          rating={averageRating}
          label={`Average rating: ${averageRating} out of 5 stars`}
          className="mt-2 lg:justify-center"
          starClassName="size-5"
        />
        <p className="mt-2 text-sm text-neutral-600">
          Based on {totalReviews} reviews
        </p>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-6 w-full rounded-full border-neutral-950 bg-transparent px-8 text-neutral-950 shadow-none hover:bg-neutral-950 hover:text-white"
        >
          Write a review
        </Button>
      </div>
    </div>
  );
}
