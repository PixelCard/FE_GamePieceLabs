import type { ProductImageDto, UploadProductImageInput } from "@/features/admin/product-images/types/product-images.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:44329";

export async function uploadProductImageAsync(input: UploadProductImageInput): Promise<ProductImageDto> {
  const form = new FormData();
  form.append("productId", input.productId);
  form.append("file", input.file);
  form.append("isPrimary", String(input.isPrimary));
  form.append("displayOrder", String(input.displayOrder));
  if (input.altText?.trim()) {
    form.append("altText", input.altText.trim());
  }

  const response = await fetch(`${API_BASE_URL}/api/admin/product-images/upload`, {
    method: "POST",
    body: form,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Upload failed: ${response.status}${err ? ` - ${err}` : ""}`);
  }

  return (await response.json()) as ProductImageDto;
}
