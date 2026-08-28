import type { CardImageTitleProps } from "@/components/shared/card-image-title";

export const gameCategories = [
  {
    title: "Arkham Horror",
    imageSrc: "/images/games/arkham-horror.jpg",
    imageAlt: "Arkham Horror: The Card Game cover art",
    href: "/products?game=arkham-horror",
  },
  {
    title: "Ankh Gods of Egypt",
    imageSrc: "/images/games/ankh-gods-of-egypt.jpg",
    imageAlt: "Ankh: Gods of Egypt cover art",
    href: "/products?game=ankh-gods-of-egypt",
  },
  {
    title: "Aeon's End",
    imageSrc: "/images/games/aeons-end.jpg",
    imageAlt: "Aeon's End cover art",
    href: "/products?game=aeons-end",
  },
  {
    title: "7 Wonders",
    imageSrc: "/images/games/7-wonders.jpg",
    imageAlt: "7 Wonders cover art",
    href: "/products?game=7-wonders",
  },
  {
    title: "Bloodborne: The Board Game",
    imageSrc: "/images/games/bloodborne-the-board-game.jpg",
    imageAlt: "Bloodborne: The Board Game cover art",
    href: "/products?game=bloodborne-the-board-game",
  },
] as const satisfies readonly CardImageTitleProps[];
