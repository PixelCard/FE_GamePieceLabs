import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { CardImageTitleGrid } from "@/components/shared/card-image-title";
import { ImageFrame } from "@/components/shared/image-frame";
import { cn } from "@/utils/cn";

export type SectionTitleAlign = "left" | "center" | "right";

export type SectionTitleMore = {
  label?: string;
  href?: string;
};

export type SectionTitleMoreProps = {
  title: string;
  more?: SectionTitleMore;
  align?: SectionTitleAlign;
  children: ReactNode;
  className?: string;
  content?: "text" | "imageList";
};

export type SectionTitleSplitProps = {
  title?: never;
  more?: never;
  align?: never;
  children: ReactNode;
  className?: string;
  content: "split";
  image: {
    src: string;
    alt: string;
  };
};

export type SectionTitleProps =
  | SectionTitleMoreProps
  | SectionTitleSplitProps;

export type SectionTitleGroupProps = {
  children: ReactNode;
};

export function SectionTitleGroupProps({ children }: SectionTitleGroupProps) {
  return <div className="mt-10 space-y-16 sm:space-y-20">{children}</div>;
}

const titleAlignmentClasses: Record<SectionTitleAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function SectionTitle(props: SectionTitleProps) {
  if (props.content === "split") {
    const { children, className, image } = props;

    return (
      <section
        className={cn(
          "mx-auto w-full max-w-[1900px] px-4 sm:px-6 xl:px-[50px]",
          className,
        )}
      >
        <div className="mx-auto grid w-full overflow-hidden rounded-2xl bg-white sm:max-w-[620px] sm:rounded-3xl lg:max-w-[940px] lg:grid-cols-12 xl:max-w-[1580px]">
          <div className="lg:col-span-6">
            <ImageFrame
              src={image.src}
              alt={image.alt}
              aspectRatio="aspect-square"
              sizes="(max-width: 1023px) calc(100vw - 3rem), (max-width: 1919px) 50vw, 790px"
              containerClassName="w-full max-w-none sm:w-full xl:w-full"
              className="rounded-none border-0 shadow-none sm:rounded-none"
            />
          </div>

          <div className="flex items-center justify-center px-6 py-14 sm:px-10 sm:py-16 lg:col-span-6 lg:px-12 lg:py-10 xl:px-20">
            {children}
          </div>
        </div>
      </section>
    );
  }

  const {
    title,
    more,
    align = "left",
    children,
    className,
    content,
  } = props;
  const titleId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`;

  if (content !== "text") {
    return (
      <section
        aria-labelledby={titleId}
        className={cn(
          "mx-auto w-full max-w-[1900px] px-4 sm:px-6 xl:px-[50px]",
          className,
        )}
      >
        <div className="mx-auto w-full sm:max-w-[620px] lg:max-w-[940px] xl:max-w-[1580px]">
          <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
            <h2
              id={titleId}
              className={cn(
                "m-0 min-w-0 flex-1 text-2xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-[clamp(2rem,2.4vw,3rem)] sm:leading-none",
                titleAlignmentClasses[align],
              )}
            >
              {title}
            </h2>

            <div className="flex inline-flex">
              <Link
                href={more?.href || "#"}
                className="group inline-flex w-fit items-center gap-4 rounded-full text-base font-bold text-neutral-950 outline-none transition-colors hover:text-red-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:text-lg"
              >
                {more?.label}

                {more && (
                  <>
                    <span className="flex size-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors group-hover:bg-red-600 group-hover:text-white">
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </span>
                  </>
                )}
              </Link>
            </div>
          </div>

          <CardImageTitleGrid>{children}</CardImageTitleGrid>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "mx-auto w-full max-w-[1900px] px-4 sm:px-6 xl:px-[50px]",
        className,
      )}
    >
      <div className="mx-auto w-full sm:max-w-[620px] lg:max-w-[940px] xl:max-w-[1580px]">
        <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <h2
            id={titleId}
            className={cn(
              "m-0 min-w-0 flex-1 text-2xl font-bold tracking-[-0.035em] text-neutral-950 sm:text-[clamp(2rem,2.4vw,3rem)] sm:leading-none",
              titleAlignmentClasses[align],
            )}
          >
            {title}
          </h2>

          <div className="flex inline-flex">
            <Link
              href={more?.href || "#"}
              className="group inline-flex w-fit items-center gap-4 rounded-full text-base font-bold text-neutral-950 outline-none transition-colors hover:text-red-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:text-lg"
            >
              {more?.label}

              {more && (
                <>
                  <span className="flex size-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors group-hover:bg-red-600 group-hover:text-white">
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </span>
                </>
              )}
            </Link>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
