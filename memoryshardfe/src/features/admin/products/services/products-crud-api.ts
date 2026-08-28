import type {
  CreateUpdateProductInput,
  ProductCrudDto,
  ProductCrudPagedResult,
} from "@/features/admin/products/types/products-crud.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:44329";

export async function getAdminProductsAsync(skipCount = 0, maxResultCount = 20): Promise<ProductCrudPagedResult> {
  const params = new URLSearchParams({
    skipCount: String(skipCount),
    maxResultCount: String(maxResultCount),
  });

  const response = await fetch(`${API_BASE_URL}/api/app/product-crud?${params.toString()}`, {
    method: "GET",  
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load products. Status: ${response.status}`);
  }

  return (await response.json()) as ProductCrudPagedResult;
}

export async function getAdminProductByIdAsync(id: string): Promise<ProductCrudDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/product-crud/${id}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to load product detail. Status: ${response.status}. ${errorText}`);
  }

  return (await response.json()) as ProductCrudDto;
}

export async function createAdminProductAsync(input: CreateUpdateProductInput): Promise<ProductCrudDto> {
  const response = await fetch(`${API_BASE_URL}/api/app/product-crud`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to create product. Status: ${response.status}. ${errorText}`);
  }

  return (await response.json()) as ProductCrudDto;
}

export async function updateAdminProductAsync(id: string, input: CreateUpdateProductInput): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/app/product-crud/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to update product. Status: ${response.status}. ${errorText}`);
  }
}

export async function deleteAdminProductAsync(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/app/product-crud/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to delete product. Status: ${response.status}. ${errorText}`);
  }
}
