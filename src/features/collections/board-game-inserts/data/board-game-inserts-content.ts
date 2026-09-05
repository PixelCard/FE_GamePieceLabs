import type {
  BoardGameInsertsEditorialData,
  BoardGameInsertsFilterData,
  BoardGameInsertsHeroData,
  BoardGameInsertsMarqueeData,
} from "@/features/collections/board-game-inserts/types/board-game-inserts";

export const boardGameInsertsHero = {
  header: "Board Game Inserts",
  description:
    "Explore our range of game-specific, laser-cut organizers, crafted to enhance your gaming experience by supporting both setup and storage. Choose the perfect gear for your next game night from our ever-expanding inventory!",
  imageSrc:
    "https://laserox.net/cdn/shop/files/MH40S2_StillLife-GuitarStore_2016_1.jpg_2.png?v=1715757791&width=1800",
  imageAlt: "Wooden board game inserts arranged on a gaming table",
} as const satisfies BoardGameInsertsHeroData;

export const boardGameInsertsEditorial = {
  imageSrc:
    "https://laserox.net/cdn/shop/collections/boardgameinsert.webp?v=1718870186&width=1200",
  imageAlt: "Wooden board game organizer filled with cards and tokens",
  emblemSrc:
    "https://laserox.net/cdn/shop/files/emblem_black.png?v=1730107069&width=271",
  emblemAlt: "Laserox emblem",
  heading: "Clear Space, Clear Strategy",
  description:
    "Discover our line of expertly crafted game organizers, designed with three core principles in mind: efficient storage, speedy setup and teardown, and in-game support. Each organizer is designed to perfectly follow the theme of your favorite board games. Made from sustainably sourced birch plywood and precision-cut by laser, our organizers are built to last a lifetime, enhancing every game night with seamless organization.",
} as const satisfies BoardGameInsertsEditorialData;

export const boardGameInsertsMarquee = {
  title: "Mastery is a never-ending exploration",
  speed: 50,
  fontSize: "text-8xl",
} as const satisfies BoardGameInsertsMarqueeData;

export const boardGameInsertsFilters = {
  productTypes: [
    { id: "accessories", label: "Accessories", count: 1 },
    { id: "divider", label: "Divider", count: 4 },
    { id: "insert", label: "Insert", count: 276 },
  ],
  price: {
    min: 0,
    max: 274,
    step: 1,
    currency: "USD",
  },
  sortOptions: [
    "featured",
    "most relevant",
    "best selling",
    "alphabetically, a-z",
    "alphabetically, z-a",
    "price, low to high",
    "price, high to low",
    "date, old to new",
    "date, new to old",
  ],
} as const satisfies BoardGameInsertsFilterData;
