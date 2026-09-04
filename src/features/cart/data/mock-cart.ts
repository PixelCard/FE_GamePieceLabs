import type { CartDto } from "@/features/cart/types/cart";

export const mockCart: CartDto = {
  userid: "mock-storefront-user",
  productCarts: [
    {
      productid: "a3f1c2d4-7b8e-4a9d-9c0f-1e2d3c4b5a61",
      quantity: 1,
      isSelected: true,
      addedat: "2026-09-01T09:30:00.000Z",
      updatedat: "2026-09-01T09:30:00.000Z",
    },
    {
      productid: "b4e2d3c5-8f9a-4b0e-a1d2-2f3e4d5c6b72",
      quantity: 2,
      isSelected: true,
      addedat: "2026-09-02T10:15:00.000Z",
      updatedat: "2026-09-02T10:15:00.000Z",
    },
    {
      productid: "c5f3e4d6-9a0b-4c1f-b2e3-3a4f5e6d7c83",
      quantity: 1,
      isSelected: false,
      addedat: "2026-09-03T14:45:00.000Z",
      updatedat: "2026-09-03T14:45:00.000Z",
    },
  ],
  updateCartAt: "2026-09-03T14:45:00.000Z",
  lastActivityAt: "2026-09-03T14:45:00.000Z",
};
