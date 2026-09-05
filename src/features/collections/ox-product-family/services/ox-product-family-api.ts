import "server-only";

import { collectionHero } from "@/features/collections/ox-product-family/data/collection-hero";
import { otherCategories } from "@/features/collections/board-game-inserts/data/other-categories";
import { CollectionsPageData } from "@/features/collections/ox-product-family/types/ox-product-family";
import { oxProductFamilyProducts } from "@/features/collections/ox-product-family/data/ox-product-family-product";
import { collectionEditorial } from "@/features/collections/ox-product-family/data/collection-editorial";

export function getOXProductFamily(): Promise<CollectionsPageData> {
  return Promise.resolve({
    hero: collectionHero,
    editorial: collectionEditorial,
    products: oxProductFamilyProducts,
    otherCategories,
  });
}
