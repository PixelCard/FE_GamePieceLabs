
import { byGameNameProducts } from "@/features/collections/by-game-name/data/by-game-name-products";
import { collectionEditorial } from "@/features/collections/by-game-name/data/collection-editorial";
import { otherCategories } from "@/features/collections/by-game-name/data/other-categories";
import type { ByGameNamePageData } from "@/features/collections/by-game-name/types/by-game-name";

export function getByGameName(): Promise<ByGameNamePageData> {
  return Promise.resolve({
    title: "Gloomhaven: Buttons & Bugs",
    editorial: collectionEditorial,
    products: byGameNameProducts,
    otherCategories,
  });
}
