import "server-only";

import { boardGameInsertsProducts } from "@/features/collections/board-game-inserts/data/board-game-inserts-products";
import { collectionEditorial } from "@/features/collections/board-game-inserts/data/collection-editorial";
import { collectionHero } from "@/features/collections/board-game-inserts/data/collection-hero";
import { otherCategories } from "@/features/collections/board-game-inserts/data/other-categories";
import type { CollectionsPageData } from "@/features/collections/board-game-inserts/types/board-game-inserts";

export function getBoardGameInsertsAsync(): Promise<CollectionsPageData> {
  return Promise.resolve({
    hero: collectionHero,
    editorial: collectionEditorial,
    products: boardGameInsertsProducts,
    otherCategories,
  });
}
