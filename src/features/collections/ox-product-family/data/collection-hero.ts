import type { CollectionHero } from "@/features/collections/board-game-inserts/types/board-game-inserts";

export const collectionHero = {
  header: "OX Product Family",
  description:
    "Explore our range of ergonomic, solid wood accessories, crafted to enhance your gaming experience and immerse you fully in your campaign. Choose the perfect gear for your next game night from our ever-expanding inventory!",
  imageSrc: "https://laserox.net/cdn/shop/files/ox.png?v=1731332528&width=2000",
  imageAlt: "Wooden board game inserts arranged on a gaming table",
} as const satisfies CollectionHero;
