import { mockYouMayAlsoLikeProducts } from "@/features/products/data/mock-you-may-also-like-products";
import type { ProductCardProps } from "@/components/shared/product/product-card";

export function getMockYouMayAlsoLikeProducts(): readonly ProductCardProps[] {
  return mockYouMayAlsoLikeProducts;
}
