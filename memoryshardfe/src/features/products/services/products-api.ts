import { ProductDetailDto } from "@/features/products/types/product-details";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:44329";

export async function getProductByIdAsync(productId: string): Promise<ProductDetailDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/product/${productId}/detail`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load product details. Status: ${response.status}`);
  }

  const product = (await response.json()) as ProductDetailDto;
  return product;
}
