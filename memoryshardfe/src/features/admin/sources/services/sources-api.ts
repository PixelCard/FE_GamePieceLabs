import type {
  CreateUpdateProductSouceDto,
  ProductSouceDto,
  ProductSoucePagedResult,
} from "@/features/admin/sources/types/sources.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:44329";

async function parseError(response: Response): Promise<string> {
  const body = await response.text();
  return body ? `${response.status} - ${body}` : `${response.status}`;
}

export async function getSourcesAsync(skipCount = 0, maxResultCount = 50): Promise<ProductSoucePagedResult> {
  const params = new URLSearchParams({ skipCount: String(skipCount), maxResultCount: String(maxResultCount) });
  const response = await fetch(`${API_BASE_URL}/api/app/product-souce?${params.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Failed to load sources: ${await parseError(response)}`);
  return (await response.json()) as ProductSoucePagedResult;
}

export async function getSourceByIdAsync(id: string): Promise<ProductSouceDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/product-souce/${id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Failed to load source: ${await parseError(response)}`);
  return (await response.json()) as ProductSouceDto;
}

export async function createSourceAsync(input: CreateUpdateProductSouceDto): Promise<ProductSouceDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/product-souce`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Create source failed: ${await parseError(response)}`);
  return (await response.json()) as ProductSouceDto;
}

export async function updateSourceAsync(id: string, input: CreateUpdateProductSouceDto): Promise<ProductSouceDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/product-souce/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Update source failed: ${await parseError(response)}`);
  return (await response.json()) as ProductSouceDto;
}

export async function deleteSourceAsync(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/app/product-souce/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`Delete source failed: ${await parseError(response)}`);
}
