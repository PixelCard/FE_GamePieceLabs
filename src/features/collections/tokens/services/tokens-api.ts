import "server-only";

import { otherCategories } from "@/features/collections/board-game-inserts/data/other-categories";
import { CollectionsPageData } from "@/features/collections/tokens/types/tokens";
import { collectionHero } from "@/features/collections/tokens/data/collection-hero";
import { tokenProducts } from "@/features/collections/tokens/data/tokens-product";
import { collectionEditorial } from "@/features/collections/tokens/data/collection-editorial";

export function getTokens(): Promise<CollectionsPageData> {
  return Promise.resolve({
    hero: collectionHero,
    editorial: collectionEditorial,
    products: tokenProducts,
    otherCategories,
  });
}
