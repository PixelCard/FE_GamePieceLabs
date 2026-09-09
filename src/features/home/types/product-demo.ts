export type ProductHotspotSide = "top" | "right" | "bottom" | "left";

export interface ProductHotspot {
  id: string;
  title: string;
  text: string;
  position: {
    left: string;
    top: string;
  };
  side: ProductHotspotSide;
}
