import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export type ImageFrameAspectRatio = "16/9" | "21/9" | "4/3" | "3/2" | "auto";

export type ImageFrameProps = {
  src: string;
  alt?: string;
  caption?: string;
  aspectRatio?: ImageFrameAspectRatio | string;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean | ReactNode;
  containerClassName?: string;
  className?: string;
  imageClassName?: string;
  objectFit?: "cover" | "contain";
};

const aspectRatioMap: Record<ImageFrameAspectRatio, string> = {
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  auto: "aspect-auto",
};

export function ImageFrame({
  src,
  alt = "Frame image",
  caption,
  aspectRatio = "21/9",
  priority = false,
  sizes = "(max-width: 640px) calc(100vw - 2rem), (max-width: 1280px) calc(100vw - 3rem), calc(100vw - 100px)",
  overlay,
  containerClassName,
  className,
  imageClassName,
  objectFit = "cover",
}: ImageFrameProps) {
  const aspectClass =
    aspectRatio in aspectRatioMap
      ? aspectRatioMap[aspectRatio as ImageFrameAspectRatio]
      : aspectRatio;

  return (
    <figure
      className={cn(
        "mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] xl:w-[calc(100%-100px)] max-w-[1580px]",
        containerClassName
      )}
    >
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:border-neutral-800",
          aspectClass,
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "transition-transform duration-700 ease-out group-hover:scale-[1.02]",
            objectFit === "contain" ? "object-contain" : "object-cover",
            imageClassName
          )}
        />

        {overlay ? (
          typeof overlay === "boolean" ? (
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
            />
          ) : (
            overlay
          )
        ) : null}
      </div>

      {caption ? (
        <figcaption className="mt-3 text-center text-xs font-medium text-neutral-500 sm:text-sm dark:text-neutral-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
