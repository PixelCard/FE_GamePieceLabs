import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export type ImageFrameAspectRatio = "16/9" | "21/9" | "4/3" | "3/2" | "auto";
export type ImageHeaderElementSize = "h1" | "h2" | "h3";
export type TextAlignType = "left" | "center" | "right";

export type ImageFrameProps = {
  src: string;
  alt?: string;
  header?: string;
  title?: string;
  description?: string;
  caption?: string;
  headerSize?: ImageHeaderElementSize;
  textAlign?: TextAlignType;
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

const headingSizeMap: Record<ImageHeaderElementSize, string> = {
  h1: "text-4xl sm:text-5xl lg:text-7xl",
  h2: "text-3xl sm:text-4xl lg:text-6xl",
  h3: "text-2xl sm:text-3xl lg:text-5xl",
};

const textAlignMap: Record<TextAlignType, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export function ImageFrame({
  src,
  alt = "Frame image",
  header,
  title,
  description,
  headerSize = "h1",
  textAlign = "left",
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
  const HeaderElement = headerSize;
  const hasTextContent = Boolean(header || title || description);
  const aspectClass =
    aspectRatio in aspectRatioMap
      ? aspectRatioMap[aspectRatio as ImageFrameAspectRatio]
      : aspectRatio;

  return (
    <figure
      className={cn(
        "mx-auto w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] xl:w-[calc(100%-100px)] max-w-[1580px]",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/80 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:border-neutral-800",
          aspectClass,
          className,
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
            imageClassName,
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
        ) : hasTextContent ? (
          <div aria-hidden="true" className="absolute inset-0 bg-black/50" />
        ) : null}

        {hasTextContent ? (
          <div
            className={cn(
              "absolute inset-0 z-10 flex flex-col justify-center p-5 text-white sm:p-8 lg:p-14 max-sm:text-center",
              textAlignMap[textAlign],
            )}
          >
            {header ? (
              <HeaderElement
                className={cn(
                  "max-w-4xl font-bold leading-tight tracking-tight text-balance drop-shadow-sm max-sm:w-full max-sm:self-center max-sm:text-center max-sm:text-4xl",
                  headingSizeMap[headerSize],
                )}
              >
                {header}
              </HeaderElement>
            ) : null}

            {title ? (
              <p className="mt-6 max-w-4xl text-lg font-semibold leading-snug text-balance drop-shadow-sm sm:text-xl lg:mt-8 lg:text-2xl">
                {title}
              </p>
            ) : null}

            {description ? (
              <p
                className={cn(
                  "max-w-2xl text-md text-white drop-shadow-sm sm:text-md lg:leading-8 text-wrap",
                  header && !title ? "mt-10 sm:mt-14 lg:mt-20" : "mt-3 sm:mt-4",
                )}
              >
                {description}
              </p>
            ) : null}
          </div>
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
