import type { PaginatedByGameNameProducts } from "@/features/collections/by-game-name/types/by-game-name";

export const byGameNameProducts = {
  data: [
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
  ],
  pagination: {
    currentPage: 1,
    pageSize: 1,
    totalItems: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  },
} as const satisfies PaginatedByGameNameProducts;
