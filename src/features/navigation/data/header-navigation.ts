import type {
  HeaderNavigationItem,
  HeaderPromoCard,
} from "@/features/navigation/types/header-navigation";

export const contactNavigationItem: HeaderNavigationItem = {
  label: "Contact",
  href: "/contact",
};

export const productMenuItems: HeaderNavigationItem[] = [
  { label: "All products", href: "/products" },
  { label: "By Game", href: "/by-game-name" },
  { label: "Board Game Inserts", href: "/collections/board-game-inserts" },
  { label: "OX Product Family", href: "/collections/ox-product-family" },
  { label: "Tokens", href: "/collections/tokens" },
];

export const promoCards: HeaderPromoCard[] = [
  {
    title: "Board Game Inserts",
    description: "Organize every game night",
    href: "/products?group=inserts",
    tone: "charcoal",
    icon: "inserts",
  },
  {
    title: "Hotlist",
    description: "Most wanted this week",
    href: "/products?group=hotlist",
    tone: "ocean",
    icon: "hotlist",
  },
  {
    title: "New in 2026",
    description: "Fresh arrivals for your table",
    href: "/products?group=new",
    tone: "walnut",
    icon: "new",
  },
];

export const aboutMenuItems: HeaderNavigationItem[] = [
  { label: "About Game Piece Labs", href: "/about" },
  { label: "Materials", href: "/about/materials" },
  { label: "Play Green", href: "/about/sustainability" },
  { label: "Craft & Quality", href: "/about/craft" },
];

export const aboutPromoCards: HeaderPromoCard[] = [
  {
    title: "About Game Piece Labs",
    description: "Made for memorable game nights",
    href: "/about",
    tone: "clay",
    icon: "story",
  },
  {
    title: "Materials",
    description: "Chosen for play and longevity",
    href: "/about/materials",
    tone: "sand",
    icon: "materials",
  },
  {
    title: "Play Green",
    description: "A lighter footprint at the table",
    href: "/about/sustainability",
    tone: "forest",
    icon: "green",
  },
];
