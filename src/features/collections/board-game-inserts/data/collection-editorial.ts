import type { CollectionEditorial } from "@/features/collections/board-game-inserts/types/board-game-inserts";

export const collectionEditorial = {
  imageSrc:
    "https://laserox.net/cdn/shop/collections/boardgameinsert.webp?v=1718870186&width=1200",
  imageAlt: "Wooden board game organizer filled with cards and tokens",
  emblemSrc:
    "https://laserox.net/cdn/shop/files/emblem_black.png?v=1730107069&width=271",
  emblemAlt: "Laserox emblem",
  heading: "Clear Space, Clear Strategy",
  description:
    "Discover our line of expertly crafted game organizers, designed with three core principles in mind: efficient storage, speedy setup and teardown, and in-game support. Each organizer is designed to perfectly follow the theme of your favorite board games. Made from sustainably sourced birch plywood and precision-cut by laser, our organizers are built to last a lifetime, enhancing every game night with seamless organization.",
} as const satisfies CollectionEditorial;
