import type { ReactElement, ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/utils/cn";

import type {
  SectionTitleAlign,
  SectionTitleMore,
  SectionTitleOrientation,
} from "./types";

interface SectionHeadingProps {
  title: string;
  titleId: string;
  more?: SectionTitleMore;
  align?: SectionTitleAlign;
  orientation?: SectionTitleOrientation;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  className?: string;
}

const titleAlignmentClasses: Record<SectionTitleAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const verticalAlignmentClasses: Record<SectionTitleAlign, string> = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};

export function createSectionTitleId(title: string): string {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return `${slug || "section"}-title`;
}

export function SectionHeading({
  title,
  titleId,
  more,
  align = "left",
  orientation = "horizon",
  topContent,
  bottomContent,
  className,
}: SectionHeadingProps): ReactElement {
  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      {topContent ? (
        <div className={cn("w-full", titleAlignmentClasses[align])}>
          {topContent}
        </div>
      ) : null}

      <div
        className={cn(
          "flex w-full flex-col gap-3",
          orientation === "horizon"
            ? "sm:flex-row sm:items-center sm:justify-between sm:gap-5"
            : verticalAlignmentClasses[align],
        )}
      >
        <h2
          id={titleId}
          className={cn(
            "type-h2 m-0 min-w-0 flex-1 text-neutral-950",
            titleAlignmentClasses[align],
          )}
        >
          {title}
        </h2>

        {more ? (
          <Link
            href={more.href || "#"}
            className="group inline-flex w-fit items-center gap-4 rounded-full text-base font-bold text-neutral-950 outline-none transition-colors hover:text-red-600 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:text-lg"
          >
            {more.label}

            <span className="flex size-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors group-hover:bg-red-600 group-hover:text-white">
              <ChevronRight className="size-4" aria-hidden="true" />
            </span>
          </Link>
        ) : null}
      </div>

      {bottomContent ? (
        <div className={cn("w-full", titleAlignmentClasses[align])}>
          {bottomContent}
        </div>
      ) : null}
    </div>
  );
}
