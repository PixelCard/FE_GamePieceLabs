import "server-only";

import {
  boardGameInsertsEditorial,
  boardGameInsertsFilters,
  boardGameInsertsHero,
  boardGameInsertsMarquee,
} from "@/features/collections/board-game-inserts/data/board-game-inserts-content";
import { boardGameInsertsProducts } from "@/features/collections/board-game-inserts/data/board-game-inserts-products";
import { otherCategories } from "@/features/collections/board-game-inserts/data/other-categories";
import type { BoardGameInsertsPageData } from "@/features/collections/board-game-inserts/types/board-game-inserts";

export function getBoardGameInserts(
  slug: string,
): Promise<BoardGameInsertsPageData> {
  void slug;

  return Promise.resolve({
    hero: boardGameInsertsHero,
    editorial: boardGameInsertsEditorial,
    marquee: boardGameInsertsMarquee,
    filters: boardGameInsertsFilters,
    products: boardGameInsertsProducts,
    otherCategories,
  });
}
