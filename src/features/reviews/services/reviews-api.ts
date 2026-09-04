import { mockProductReviews } from "@/features/reviews/data/mock-product-reviews";
import type { ProductReviews } from "@/features/reviews/types/product-review";

export function getProductReviews(
  productId: string,
): ProductReviews | undefined {
  return mockProductReviews.find((reviews) => reviews.productId === productId);
}
