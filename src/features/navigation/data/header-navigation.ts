import type {
  HeaderNavigationItem,
  HeaderPromoCard,
} from "@/features/navigation/types/header-navigation";

export const contactNavigationItem: HeaderNavigationItem = {
  label: "Contact",
  href: "/contact",
};

export const productMenuItems: HeaderNavigationItem[] = [
  { label: "By Game", href: "/products?group=game" },
  { label: "Board Game Inserts", href: "/products?group=inserts" },
  { label: "MemoryShard Family", href: "/products?group=memoryshard" },
  { label: "Tokens", href: "/products?group=tokens" },
  { label: "RPG Accessories", href: "/products?group=rpg" },
  { label: "Accessories", href: "/products?group=accessories" },
  { label: "Gaming Kits", href: "/products?group=kits" },
  { label: "Sleeves", href: "/products?group=sleeves" },
  { label: "All products", href: "/products" },
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
  { label: "About MemoryShard", href: "/about" },
  { label: "Materials", href: "/about/materials" },
  { label: "Play Green", href: "/about/sustainability" },
  { label: "Craft & Quality", href: "/about/craft" },
  { label: "Blog", href: "/blog" },
];

export const aboutPromoCards: HeaderPromoCard[] = [
  {
    title: "About MemoryShard",
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
