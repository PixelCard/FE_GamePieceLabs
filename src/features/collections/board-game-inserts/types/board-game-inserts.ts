import type { SupportedCurrency } from "@/utils/format-currency";

export interface BoardGameInsertsHeroData {
  header: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export interface BoardGameInsertsEditorialData {
  imageSrc: string;
  imageAlt: string;
  emblemSrc: string;
  emblemAlt: string;
  heading: string;
  description: string;
}

export interface BoardGameInsertsMarqueeData {
  title: string;
  speed: number;
  fontSize: "text-8xl";
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

export interface BoardGameInsertsTypeFilterItem {
  id: string;
  label: string;
  count: number;
}

export interface BoardGameInsertsFilterData {
  productTypes: readonly BoardGameInsertsTypeFilterItem[];
  sortOptions: readonly string[];
  price: {
    min: number;
    max: number;
    step: number;
    currency: "USD" | "VND";
  };
}

export interface OtherCategory {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  isArrow: boolean;
}

export interface BoardGameInsertsPageData {
  hero: BoardGameInsertsHeroData;
  editorial: BoardGameInsertsEditorialData;
  marquee: BoardGameInsertsMarqueeData;
  filters: BoardGameInsertsFilterData;
  products: PaginatedBoardGameInserts;
  otherCategories: readonly OtherCategory[];
}
