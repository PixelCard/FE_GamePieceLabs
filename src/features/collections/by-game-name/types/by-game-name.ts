import type { ProductCardProps } from "@/components/shared/product/product-card";
import type { PaginationMetadata } from "@/types";

export type ByGameNameProduct = ProductCardProps;

export interface PaginatedByGameNameProducts {
  data: readonly ByGameNameProduct[];
  pagination: PaginationMetadata;
}

export interface ByGameNameEditorial {
  imageSrc: string;
  imageAlt: string;
  emblemSrc: string;
  emblemAlt: string;
}

export interface ByGameNameCategory {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  isArrow: boolean;
}

export interface ByGameNamePageData {
  title: string;
  editorial: ByGameNameEditorial;
  products: PaginatedByGameNameProducts;
  otherCategories: readonly ByGameNameCategory[];
}
