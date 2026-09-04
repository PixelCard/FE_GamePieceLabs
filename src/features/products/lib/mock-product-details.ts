import { mockProductDetails } from "@/features/products/data/mock-product-details";
import type { ProductDetailDto } from "@/features/products/types/product-details";

export function getMockProductById(productIdentifier: string): ProductDetailDto | undefined {
  return mockProductDetails.find(
    (product) =>
      product.id === productIdentifier ||
      product.slug === productIdentifier ||
      `${product.slug}-${product.gui}` === productIdentifier,
  );
}
