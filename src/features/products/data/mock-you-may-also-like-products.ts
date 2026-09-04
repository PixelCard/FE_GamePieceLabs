import type { ProductCardProps } from "@/components/shared/product-card";

export type YouMayAlsoLikeProduct = ProductCardProps;

export const mockYouMayAlsoLikeProducts = [
  {
    slug: "terraforming-mars-tokens",
    gui: "8442315473138",
    name: "Terraforming Mars Tokens",
    imageSrc:
      "https://laserox.net/cdn/shop/files/All_Four_800_7e4e290e-6c22-4c59-942d-f5cf6304e1dd.jpg?v=1717748348&width=2322",
    imageAlt: "Four colorful acrylic tokens for Terraforming Mars",
    price: 225000,
    currency: "VND",
    rating: 4.8,
  },
  {
    slug: "woodcraft-organizer",
    gui: "8469487321330",
    name: "Woodcraft Organizer",
    imageSrc:
      "https://laserox.net/cdn/shop/files/LWOT_Woodcraft_comp-5.jpg?v=1718819253&width=1000",
    imageAlt: "Wooden card holder from the Woodcraft Organizer",
    price: 1125000,
    currency: "VND",
    rating: 4.9,
  },
  {
    slug: "gloomhaven-second-edition-organizer",
    gui: "14943222333816",
    name: "Gloomhaven: Second Edition Organizer",
    imageSrc:
      "https://laserox.net/cdn/shop/files/LGB2-hero1.jpg?v=1752141144&width=1920",
    imageAlt:
      "Gloomhaven Second Edition Organizer with wooden trays and game components",
    price: 3495000,
    currency: "VND",
    rating: 4.7,
  },
] as const satisfies readonly YouMayAlsoLikeProduct[];
