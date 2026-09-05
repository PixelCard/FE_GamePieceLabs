import type { CollectionEditorial } from "@/features/collections/board-game-inserts/types/board-game-inserts";

export const collectionEditorial = {
  imageSrc:
    "https://laserox.net/cdn/shop/collections/fa9d8366b6a8ef51a66a0107f9947bac.jpg?v=1720074356&width=800",
  imageAlt: "Wooden board game organizer filled with cards and tokens",
  emblemSrc:
    "https://laserox.net/cdn/shop/files/emblem_black.png?v=1730107069&width=271",
  emblemAlt: "Laserox emblem",
  heading: "Durable Tokens for Every Game",
  description:
    "Elevate your gaming experience with our durable, uniquely crafted tokens. Each piece is meticulously laser-cut and engraved from high-quality acrylic, tailored to match specific games. Our tokens are durable, waterproof, fade-resistant, and designed to withstand the rigors of intense gaming sessions, ensuring that they remain a vital part of your gaming armory for many years to come.",
} as const satisfies CollectionEditorial;
