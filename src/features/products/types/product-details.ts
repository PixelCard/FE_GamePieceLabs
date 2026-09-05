
export type ProductImageDto = {
  id: string;
  publicUrl?: string | null;
  altText?: string | null;
  isPrimary: boolean;
  displayOrder: number;
};

export type MaterialDto = {
  id: string;
  matterialName: string;
};

export type ProductDetailDto = {
  id: string;
  name: string;
  orginalPrice: number;
  discountPercentage?: number | null;
  description?: string | null;
  images: ProductImageDto[];
  materials: MaterialDto[];
  features?: string[]
};