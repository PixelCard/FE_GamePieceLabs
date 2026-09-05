import type { CollectionHero } from "@/features/collections/board-game-inserts/types/board-game-inserts";

export const collectionHero = {
  header: "Board Game Inserts",
  description:
    "Explore our range of game-specific, laser-cut organizers, crafted to enhance your gaming experience by supporting both setup and storage. Choose the perfect gear for your next game night from our ever-expanding inventory!",
  imageSrc:
    "https://laserox.net/cdn/shop/files/MH40S2_StillLife-GuitarStore_2016_1.jpg_2.png?v=1715757791&width=1800",
  imageAlt: "Wooden board game inserts arranged on a gaming table",
} as const satisfies CollectionHero;
