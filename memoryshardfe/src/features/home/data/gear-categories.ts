import type { CardImageTitleProps } from "@/components/shared/card-image-title";

export const gearCategories = [
  {
    title: "Board Game Inserts",
    imageSrc: "/images/contact/contact-hero.png",
    imageAlt: "Board game inserts, tokens, cards, and accessories on a table",
    href: "/products?group=inserts",
    imagePosition: "22% center",
  },
  {
    title: "MemoryShard Family",
    imageSrc: "/images/legacy/banner3.jpg",
    imageAlt: "Fantasy collection boxes suspended above a miniature city",
    href: "/products?group=memoryshard",
    imagePosition: "48% center",
  },
  {
    title: "Tokens",
    imageSrc: "/images/legacy/banner1.jpg",
    imageAlt: "Neon tabletop artwork in purple and blue",
    href: "/products?group=tokens",
    imagePosition: "58% center",
  },
  {
    title: "Roleplaying Games",
    imageSrc: "/images/legacy/banner2.jpg",
    imageAlt: "A roleplaying adventurer beneath a dramatic blue sky",
    href: "/products?group=rpg",
    imagePosition: "52% center",
  },
  {
    title: "Accessories",
    imageSrc: "/images/legacy/banner3.jpg",
    imageAlt: "Fantasy gaming accessories and illustrated collection boxes",
    href: "/products?group=accessories",
    imagePosition: "82% center",
  },
] as const satisfies readonly CardImageTitleProps[];
