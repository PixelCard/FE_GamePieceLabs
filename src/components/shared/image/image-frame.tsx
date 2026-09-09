import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";

export type ImageFrameAspectRatio = "16/9" | "21/9" | "4/3" | "3/2" | "auto";
export type ImageHeaderElementSize = "h1" | "h2" | "h3";
export type TextAlignType = "left" | "center" | "right";

export type ImageFrameProps = {
  src: string;
  alt?: string;
  eyebrow?: string;
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
  "21/9": "aspect-[4/3] sm:aspect-video lg:aspect-[21/9]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  auto: "aspect-auto",
};

const headingSizeMap: Record<ImageHeaderElementSize, string> = {
  h1: "type-h1",
  h2: "type-h2",
  h3: "type-h3",
};

const textAlignMap: Record<TextAlignType, string> = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-end text-right",
};

export function ImageFrame({
  src,
  alt = "Frame image",
  eyebrow,
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
  const hasTextContent = Boolean(eyebrow || header || title || description);
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
            {eyebrow ? (
              <p className="type-eyebrow mb-3 text-white/90 drop-shadow-sm">
                {eyebrow}
              </p>
            ) : null}

            {header ? (
              <HeaderElement
                className={cn(
                  "max-w-4xl text-balance drop-shadow-sm max-sm:w-full max-sm:self-center max-sm:text-center",
                  headingSizeMap[headerSize],
                )}
              >
                {header}
              </HeaderElement>
            ) : null}

            {title ? (
              <p className="mt-4 max-w-[38ch] text-balance text-lg font-semibold leading-snug drop-shadow-sm sm:mt-6 sm:text-xl lg:mt-8 lg:text-2xl">
                {title}
              </p>
            ) : null}

            {description ? (
              <p
                className={cn(
                  "type-prose max-w-2xl text-base text-white/90 drop-shadow-sm lg:text-lg",
                  header && !title ? "mt-4 sm:mt-6 lg:mt-8" : "mt-3 sm:mt-4",
                )}
              >
                {description}
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      {caption ? (
        <figcaption className="mx-auto mt-3 max-w-[65ch] text-center text-sm font-medium leading-relaxed text-neutral-500 dark:text-neutral-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
