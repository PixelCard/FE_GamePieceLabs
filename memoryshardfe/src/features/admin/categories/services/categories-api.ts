import type {
  CreateUpdateCategoryDto,
  CategoryDto,
  CategoryPagedResult,
} from "@/features/admin/categories/types/categories.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:44329";

async function parseError(response: Response): Promise<string> {
  const body = await response.text();
  return body ? `${response.status} - ${body}` : `${response.status}`;
}

export async function getCategoriesAsync(skipCount = 0, maxResultCount = 50): Promise<CategoryPagedResult> {
  const params = new URLSearchParams({ skipCount: String(skipCount), maxResultCount: String(maxResultCount) });
  const response = await fetch(`${API_BASE_URL}/api/app/category?${params.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Failed to load categories: ${await parseError(response)}`);
  return (await response.json()) as CategoryPagedResult;
}

export async function getCategoryByIdAsync(id: string): Promise<CategoryDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/category/${id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`Failed to load category: ${await parseError(response)}`);
  return (await response.json()) as CategoryDto;
}

export async function createCategoryAsync(input: CreateUpdateCategoryDto): Promise<CategoryDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Create category failed: ${await parseError(response)}`);
  return (await response.json()) as CategoryDto;
}

export async function updateCategoryAsync(id: string, input: CreateUpdateCategoryDto): Promise<CategoryDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/category/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(input),
  });

  if (!response.ok) throw new Error(`Update category failed: ${await parseError(response)}`);
  return (await response.json()) as CategoryDto;
}

export async function deleteCategoryAsync(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/app/category/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error(`Delete category failed: ${await parseError(response)}`);
}
