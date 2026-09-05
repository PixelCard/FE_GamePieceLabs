import type { SupportedCurrency } from "@/utils/format-currency";

export interface CollectionHero {
  header: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface CollectionEditorial {
  imageSrc: string;
  imageAlt: string;
  emblemSrc: string;
  emblemAlt: string;
  heading: string;
  description: string;
}

export interface BoardGameInsertProduct {
  slug: string;
  gui: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: number;
  currency: SupportedCurrency;
  rating: number;
}

export interface PaginationMetadata {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface PaginatedBoardGameInserts {
  data: readonly BoardGameInsertProduct[];
  pagination: PaginationMetadata;
}

export interface OtherCategory {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  isArrow: boolean;
}

export interface BoardGameInsertsPageData {
  hero: CollectionHero;
  editorial: CollectionEditorial;
  products: PaginatedBoardGameInserts;
  otherCategories: readonly OtherCategory[];
}
