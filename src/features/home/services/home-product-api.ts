import { HomeProductDto } from "@/features/home/types/home-product";

type PagedResult<T> = {
  totalCount: number;
  items: T[];
};

const API_BASE_URL =
  
process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:44329";

export async function getHomeProductsAsync(
  skipCount = 0,
  maxResultCount = 8
): Promise<HomeProductDto[]> {
  const params = new URLSearchParams({
    skipCount: String(skipCount),
    maxResultCount: String(maxResultCount),
    sorting: "CreationTime DESC",
  });

  const response = await fetch(
    `${API_BASE_URL}/api/app/product/home-list?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to load home products. Status: ${response.status}`);
  }

  const payload = (await response.json()) as PagedResult<HomeProductDto>;
  return payload.items ?? [];
}