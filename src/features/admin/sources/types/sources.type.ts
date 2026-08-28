export type ProductSouceDto = {
  id: string;
  souceName: string;
  souceNote?: string | null;
};

export type CreateUpdateProductSouceDto = {
  souceName: string;
  souceNote?: string | null;
};

export type ProductSoucePagedResult = {
  totalCount: number;
  items: ProductSouceDto[];
};
