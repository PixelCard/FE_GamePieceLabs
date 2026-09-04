import type { ProductCardProps } from "@/components/shared/product-card";

export type FeaturedProduct = ProductCardProps;

export const featuredProducts = [
  {
    slug: "gloomhaven-buttons-bugs-organizer",
    gui: "a3f1c2d4-7b8e-4a9d-9c0f-1e2d3c4b5a61",
    name: "Gloomhaven Buttons & Bugs Organizer",
    imageSrc:
      "https://laserox.net/cdn/shop/files/LGBB-5.jpg?v=1727173076&width=1200",
    imageAlt: "Wooden organizer for Gloomhaven Buttons and Bugs",
    price: 283500,
    currency: "VND",
    rating: 4.9,
  },
  {
    slug: "spirit-organizer",
    gui: "b4e2d3c5-8f9a-4b0e-a1d2-2f3e4d5c6b72",
    name: "Spirit Organizer",
    imageSrc:
      "https://laserox.net/cdn/shop/files/LSID_comp.jpg?v=1717751144&width=1200",
    imageAlt: "Wooden organizer trays for Spirit Island",
    price: 935750,
    currency: "VND",
    rating: 4.5,
  },
  {
    slug: "seti-organizer",
    gui: "c5f3e4d6-9a0b-4c1f-b2e3-3a4f5e6d7c83",
    name: "SETI Organizer",
    imageSrc:
      "https://laserox.net/cdn/shop/files/LSET-hero-2.png?v=1733236650&width=1200",
    imageAlt: "Wooden organizer filled with SETI board game components",
    price: 1166000,
    currency: "VND",
    rating: 4.7,
  },
  {
    slug: "spirit-island-expansion-organizer-v2",
    gui: "d6a4f5e7-0b1c-4d2a-83f4-4b5a6f7e8d94",
    name: "Spirit Island Expansion Organizer V2",
    imageSrc:
      "https://laserox.net/cdn/shop/files/LSIDE3-4.jpg?v=1738682122&width=1200",
    imageAlt: "Spirit Island expansion organizer with cards and tokens",
    price: 945000,
    currency: "VND",
    rating: 2,
  },
  {
    slug: "wyrmspan-organizer",
    gui: "e7b5a6f8-1c2d-4e3b-94a5-5c6b7a8f9e05",
    name: "Wyrmspan Organizer",
    imageSrc:
      "https://laserox.net/cdn/shop/files/LWYM-hero-1_90b7e93a-cebd-44d8-84c5-1c1efe0d741d.jpg?v=1718819267&width=1200",
    imageAlt: "Wooden organizer for Wyrmspan cards and components",
    price: 961400,
    currency: "VND",
    rating: 5,
  },
  {
    slug: "quacks-organizer",
    gui: "f8c6b7a9-2d3e-4f4c-a5b6-6d7c8b9a0f16",
    name: "Quacks Organizer",
    imageSrc:
      "https://laserox.net/cdn/shop/files/LQOQ-24.jpg?v=1718818978&width=1200",
    imageAlt: "Wooden organizer for The Quacks of Quedlinburg",
    price: 1007250,
    currency: "VND",
    rating: 4.9,
  },
] as const satisfies readonly FeaturedProduct[];
