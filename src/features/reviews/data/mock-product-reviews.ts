import type { ProductReviews } from "@/features/reviews/types/product-review";

export const mockProductReviews = [
  {
    productId: "a3f1c2d4-7b8e-4a9d-9c0f-1e2d3c4b5a61",
    averageRating: 4.9,
    totalReviews: 10,
    distribution: [
      { rating: 5, count: 9 },
      { rating: 4, count: 1 },
      { rating: 3, count: 0 },
      { rating: 2, count: 0 },
      { rating: 1, count: 0 },
    ],
    reviews: [
      {
        id: "gloomhaven-review-steve",
        author: "Steve",
        authorInitial: "S",
        rating: 5,
        title: "Easy to assemble and fits perfectly",
        content:
          "Everything slots together neatly and fits inside the original game box exactly as expected. Setup and cleanup are much faster now.",
        isVerifiedBuyer: true,
      },
      {
        id: "gloomhaven-review-martin",
        author: "Martin",
        authorInitial: "M",
        rating: 5,
        title: "Compact and handy",
        content:
          "A compact organizer that keeps every component in place. The fit is precise, and getting the game to the table feels much easier.",
        isVerifiedBuyer: true,
      },
      {
        id: "gloomhaven-review-brandon",
        author: "Brandon",
        authorInitial: "B",
        rating: 5,
        title: "Great design",
        content:
          "The thoughtful layout and engraved details make this insert both practical and great-looking. It is a strong upgrade for the game.",
        isVerifiedBuyer: true,
      },
    ],
  },
] satisfies readonly ProductReviews[];
