import type { CollectionEditorial } from "@/features/collections/board-game-inserts/types/board-game-inserts";

export const collectionEditorial = {
  imageSrc:
    "https://laserox.net/cdn/shop/collections/41c391c6446a49347a89f4af9aa8fc15_acae2f06-84a4-48aa-8a57-5f5ae9fa1be8.jpg?v=1720074599&width=800",
  imageAlt: "Wooden board game organizer filled with cards and tokens",
  emblemSrc:
    "https://laserox.net/cdn/shop/files/emblem_black.png?v=1730107069&width=271",
  emblemAlt: "Laserox emblem",
  heading: "Elegance and Utility: Premium Wood Accessories",
  description:
    "Step into the world of OX Products, where each accessory is crafted from solid wood and finished with natural, food-safe oil. Our ergonomic designs ensure comfort and utility, while the option for personalized engravings adds a unique touch to each piece. Manufactured with true craftsmanship, these accessories not only function beautifully but also add a touch of elegance to your gaming sessions.",
} as const satisfies CollectionEditorial;
