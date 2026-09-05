"use client";

import Image from "next/image";

import { cn } from "@/utils/cn";

export interface ProductThumbnailImage {
  id: string;
  src: string;
  alt: string;
}

export interface ProductThumbnailProps {
  image: ProductThumbnailImage;
  isSelected?: boolean;
  onSelect?: (image: ProductThumbnailImage) => void;
}

export function ProductThumbnail({
  image,
  isSelected = false,
  onSelect,
}: ProductThumbnailProps) {
  return (
    <button
      type="button"
      aria-label={`Xem ${image.alt}`}
      aria-pressed={isSelected}
      onClick={() => onSelect?.(image)}
      className={cn(
        "relative block aspect-square w-full overflow-hidden rounded-lg border-2 bg-neutral-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700 focus-visible:ring-offset-2",
        isSelected
          ? "border-red-700 shadow-sm"
          : "border-transparent opacity-70 hover:border-neutral-300 hover:opacity-100",
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        unoptimized
        sizes="72px"
        className="object-cover"
      />
    </button>
  );
}
