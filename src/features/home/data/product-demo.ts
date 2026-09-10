import type { ProductHotspot } from "@/features/home/types/product-demo";

export const productDemoImage = {
  src: "https://laserox.net/cdn/shop/files/TRACKER-3-400x400_6.png?v=1714737373&width=800",
  alt: "Wooden board game organizer filled with cards, tokens, and game pieces",
  width: 800,
  height: 732,
} as const;

export const productHotspots = [
  {
    id: "sorted-components",
    title: "Sorted components",
    position: { left: "50%", top: "11%" },
    side: "bottom",
    text: "Keep every token and component sorted in a dedicated compartment.",
  },
  {
    id: "more-play-time",
    title: "More time to play",
    position: { left: "31%", top: "47.5%" },
    side: "right",
    text: "Better organization means more time strategizing, playing, and winning.",
  },
  {
    id: "faster-pack-up",
    title: "Faster pack-up",
    position: { left: "64.5%", top: "76%" },
    side: "top",
    text: "Pack the game away faster and protect every piece between sessions.",
  },
] as const satisfies readonly ProductHotspot[];
