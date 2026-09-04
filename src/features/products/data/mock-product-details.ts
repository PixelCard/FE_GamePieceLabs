import type { ProductDetailDto } from "@/features/products/types/product-details";

export type MockProductDetail = ProductDetailDto & {
  slug: string;
  gui: string;
};

export const mockProductDetails = [
  {
    id: "a3f1c2d4-7b8e-4a9d-9c0f-1e2d3c4b5a61",
    slug: "gloomhaven-buttons-bugs-organizer",
    gui: "a3f1c2d4-7b8e-4a9d-9c0f-1e2d3c4b5a61",
    name: "Gloomhaven Buttons & Bugs Organizer",
    orginalPrice: 315000,
    discountPercentage: 10,
    description:
      "Bộ khay gỗ giúp sắp xếp toàn bộ thẻ bài, token và nhân vật của Gloomhaven: Buttons & Bugs. Các khay có thể lấy trực tiếp ra bàn để rút ngắn thời gian chuẩn bị và thu dọn trò chơi.",
    images: [
      {
        id: "gloomhaven-primary",
        publicUrl:
          "https://laserox.net/cdn/shop/files/LGBB-hero-2.jpg?v=1727173067&width=800",
        altText: "Gloomhaven Buttons & Bugs Organizer",
        isPrimary: true,
        displayOrder: 1,
      },
      {
        id: "gloomhaven-secondary",
        publicUrl:
          "https://laserox.net/cdn/shop/files/LGBB-5.jpg?v=1727173076&width=112",
        altText: "Các khay bên trong Gloomhaven Buttons & Bugs Organizer",
        isPrimary: false,
        displayOrder: 2,
      },
      {
        id: "gloomhaven-secondary",
        publicUrl:
          "https://laserox.net/cdn/shop/files/LGBB-3.jpg?v=1727173082&width=112",
        altText: "Các khay bên trong Gloomhaven Buttons & Bugs Organizer",
        isPrimary: false,
        displayOrder: 3,
      },
      {
        id: "gloomhaven-secondary",
        publicUrl:
          "https://laserox.net/cdn/shop/files/LGBB-1.jpg?v=1727173087&width=112",
        altText: "Các khay bên trong Gloomhaven Buttons & Bugs Organizer",
        isPrimary: false,
        displayOrder: 3,
      },
    ],
    materials: [
      { id: "gloomhaven-material-1", matterialName: "Gỗ bạch dương 3 mm" },
      { id: "gloomhaven-material-2", matterialName: "Acrylic trong suốt" },
    ],
  },
  {
    id: "b4e2d3c5-8f9a-4b0e-a1d2-2f3e4d5c6b72",
    slug: "spirit-organizer",
    gui: "b4e2d3c5-8f9a-4b0e-a1d2-2f3e4d5c6b72",
    name: "Spirit Organizer",
    orginalPrice: 985000,
    discountPercentage: 5,
    description:
      "Hệ thống khay lưu trữ dành cho Spirit Island, hỗ trợ phân loại thẻ, linh hồn, token và các thành phần chơi. Thiết kế tối ưu cho việc setup nhanh và bảo quản lâu dài.",
    images: [
      {
        id: "spirit-primary",
        publicUrl:
          "https://laserox.net/cdn/shop/files/LSID_comp.jpg?v=1717751144&width=1200",
        altText: "Spirit Island Organizer với đầy đủ khay chứa",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    materials: [
      { id: "spirit-material-1", matterialName: "Gỗ HDF phủ veneer" },
      { id: "spirit-material-2", matterialName: "Acrylic màu" },
    ],
  },
  {
    id: "c5f3e4d6-9a0b-4c1f-b2e3-3a4f5e6d7c83",
    slug: "seti-organizer",
    gui: "c5f3e4d6-9a0b-4c1f-b2e3-3a4f5e6d7c83",
    name: "SETI Organizer",
    orginalPrice: 1325000,
    discountPercentage: 12,
    description:
      "Organizer dạng module dành cho SETI: Search for Extraterrestrial Intelligence. Mỗi nhóm linh kiện có khay riêng, giúp giữ bàn chơi gọn gàng và dễ dàng bắt đầu ván mới.",
    images: [
      {
        id: "seti-primary",
        publicUrl:
          "https://laserox.net/cdn/shop/files/LSET-hero-2.png?v=1733236650&width=1200",
        altText: "SETI Organizer trên bàn chơi",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    materials: [
      { id: "seti-material-1", matterialName: "Gỗ bạch dương" },
      { id: "seti-material-2", matterialName: "Keo gỗ không độc hại" },
    ],
  },
  {
    id: "d6a4f5e7-0b1c-4d2a-83f4-4b5a6f7e8d94",
    slug: "spirit-island-expansion-organizer-v2",
    gui: "d6a4f5e7-0b1c-4d2a-83f4-4b5a6f7e8d94",
    name: "Spirit Island Expansion Organizer V2",
    orginalPrice: 945000,
    discountPercentage: 0,
    description:
      "Bộ organizer mở rộng cho Spirit Island, phù hợp với các bộ bài đã bọc sleeve và nhiều expansion. Cấu trúc khay giúp phân loại nội dung theo từng nhóm để dễ tìm kiếm.",
    images: [
      {
        id: "spirit-expansion-primary",
        publicUrl:
          "https://laserox.net/cdn/shop/files/LSIDE3-4.jpg?v=1738682122&width=1200",
        altText: "Spirit Island Expansion Organizer V2",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    materials: [
      { id: "spirit-expansion-material-1", matterialName: "Gỗ HDF 3 mm" },
    ],
  },
  {
    id: "e7b5a6f8-1c2d-4e3b-94a5-5c6b7a8f9e05",
    slug: "wyrmspan-organizer",
    gui: "e7b5a6f8-1c2d-4e3b-94a5-5c6b7a8f9e05",
    name: "Wyrmspan Organizer",
    orginalPrice: 1045000,
    discountPercentage: 8,
    description:
      "Bộ khay Wyrmspan được thiết kế theo từng loại thẻ và tài nguyên, hỗ trợ thẻ có sleeve. Khay có thể sử dụng trực tiếp trong lúc chơi và xếp gọn vào hộp gốc.",
    images: [
      {
        id: "wyrmspan-primary",
        publicUrl:
          "https://laserox.net/cdn/shop/files/LWYM-hero-1_90b7e93a-cebd-44d8-84c5-1c1efe0d741d.jpg?v=1718819267&width=1200",
        altText: "Wyrmspan Organizer với thẻ và linh kiện",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    materials: [
      { id: "wyrmspan-material-1", matterialName: "Gỗ bạch dương 3 mm" },
    ],
  },
  {
    id: "f8c6b7a9-2d3e-4f4c-a5b6-6d7c8b9a0f16",
    slug: "quacks-organizer",
    gui: "f8c6b7a9-2d3e-4f4c-a5b6-6d7c8b9a0f16",
    name: "Quacks Organizer",
    orginalPrice: 1185000,
    discountPercentage: 15,
    description:
      "Organizer cho The Quacks of Quedlinburg với các khay nguyên liệu riêng biệt. Thiết kế giúp người chơi lấy token nhanh, hạn chế trộn lẫn và thu dọn thuận tiện.",
    images: [
      {
        id: "quacks-primary",
        publicUrl:
          "https://laserox.net/cdn/shop/files/LQOQ-24.jpg?v=1718818978&width=1200",
        altText: "Quacks Organizer và các khay token",
        isPrimary: true,
        displayOrder: 1,
      },
    ],
    materials: [
      { id: "quacks-material-1", matterialName: "Gỗ HDF phủ veneer" },
      { id: "quacks-material-2", matterialName: "Acrylic trong suốt" },
    ],
  },
] satisfies MockProductDetail[];
