import { PaginationMetadata } from "@/types";
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

export interface TokensProduct {
  slug: string;
  gui: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: number;
  currency: SupportedCurrency;
  rating: number;
}

export interface PaginatedOXProductFamily {
  data: readonly TokensProduct[];
  pagination: PaginationMetadata;
}

export interface OtherCategory {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: string;
  isArrow: boolean;
}

export interface CollectionsPageData {
  hero: CollectionHero;
  editorial: CollectionEditorial;
  products: PaginatedOXProductFamily;
  otherCategories: readonly OtherCategory[];
}
