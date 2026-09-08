import type { ByGameNameEditorial } from "@/features/collections/by-game-name/types/by-game-name";

export const collectionEditorial = {
  imageSrc:
    "https://laserox.net/cdn/shop/collections/LGBB.jpg?v=1727172485&width=1200",
  imageAlt: "Gloomhaven Buttons and Bugs box artwork",
  emblemSrc:
    "https://laserox.net/cdn/shop/files/favicon.png?v=1714066398&width=78",
  emblemAlt: "Laserox emblem",
} as const satisfies ByGameNameEditorial;
