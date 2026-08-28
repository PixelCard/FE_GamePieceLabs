export type ProductCrudDto = {
  id: string;
  productName: string;
  orginalPrice: number;
  discountPercentage?: number | null;
  quantity: number;
  productNote?: string | null;
  scale?: string | null;
  status: number;
  categoryId: string;
  categoryName?: string | null;
  providerId: string;
  providerName?: string | null;
  productSouceId: string;
  productSourceName?: string | null;
};

export type CreateUpdateProductInput = {
  productName: string;
  orginalPrice: number;
  discountPercentage?: number | null;
  quantity: number;
  productNote?: string | null;
  scale?: string | null;
  status: number;
  categoryId: string;
  providerId: string;
  productSouceId: string;
};

export type ProductCrudPagedResult = {
  totalCount: number;
  items: ProductCrudDto[];
};
