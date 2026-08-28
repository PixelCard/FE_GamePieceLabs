export type UploadProductImageInput = {
  productId: string;
  file: File;
  isPrimary: boolean;
  displayOrder: number;
  altText?: string;
};

export type ProductImageDto = {
  id: string;
  publicUrl?: string | null;
  altText?: string | null;
  isPrimary: boolean;
  displayOrder: number;
};
