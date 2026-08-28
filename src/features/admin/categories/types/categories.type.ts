export type CategoryDto = {
  id: string;
  categoryName: string;
  categoryNote?: string | null;
};

export type CreateUpdateCategoryDto = {
  categoryName: string;
  categoryNote?: string | null;
};

export type CategoryPagedResult = {
  totalCount: number;
  items: CategoryDto[];
};
