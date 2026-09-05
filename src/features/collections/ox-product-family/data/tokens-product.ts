import { PaginatedOXProductFamily } from "../types/ox-product-family";

export const oxProductFamilyProducts = {
  data: [
    {
      slug: "personal-ox-station-5-slot",
      gui: "a3f1c2d4-7b8e-4a9d-9c0f-1e2d3c4b5a61",
      name: "Personal OX Station - 5-Slot",
      imageSrc:
        "https://laserox.net/cdn/shop/files/OX_product_line_group_img-3.jpg?v=1721223526&width=500",
      imageAlt: "Wooden organizer for Gloomhaven Buttons and Bugs",
      price: 283500,
      currency: "VND",
      rating: 4.9,
    },
    {
      slug: "personal-ox-station-3-slot",
      gui: "b4e2d3c5-8f9a-4b0e-a1d2-2f3e4d5c6b72",
      name: "Personal OX Station - 3-Slot",
      imageSrc:
        "https://laserox.net/cdn/shop/files/OX_product_line_group_img-3.jpg?v=1721223526&width=500",
      imageAlt: "Wooden organizer trays for Spirit Island",
      price: 935750,
      currency: "VND",
      rating: 4.5,
    },
    {
      slug: "ox-storage-2+-1-set",
      gui: "c5f3e4d6-9a0b-4c1f-b2e3-3a4f5e6d7c83",
      name: "OX Storage 2+1 Set",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LKS_BW.jpg?v=1721294285&width=500",
      imageAlt: "Wooden organizer filled with SETI board game components",
      price: 1166000,
      currency: "VND",
      rating: 4.7,
    },
    {
      slug: "ox-standy",
      gui: "d6a4f5e7-0b1c-4d2a-83f4-4b5a6f7e8d94",
      name: "OX Standy",
      imageSrc:
        "https://laserox.net/cdn/shop/files/LKS_photo.jpg?v=1721225202&width=500",
      imageAlt: "Spirit Island expansion organizer with cards and tokens",
      price: 945000,
      currency: "VND",
      rating: 2,
    },
  ],
  pagination: {
    currentPage: 1,
    pageSize: 12,
    totalItems: 281,
    totalPages: 24,
    hasNext: true,
    hasPrevious: false,
  },
} as const satisfies PaginatedOXProductFamily;
