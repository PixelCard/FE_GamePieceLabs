import type { ReactElement } from "react";
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
  className,
}: SectionHeadingProps): ReactElement {
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-3",
        orientation === "horizon"
          ? "sm:flex-row sm:items-center sm:justify-between sm:gap-5"
          : verticalAlignmentClasses[align],
        className,
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
          className="group inline-flex w-fit items-center gap-2 rounded-full text-xs font-medium text-neutral-950 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 sm:text-sm"
        >
          {/* Thẻ span bọc chữ để chạy hiệu ứng line */}
          <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[0.8px] after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-500 group-hover:after:scale-x-100">
            {more.label}
          </span>

          {/* Icon ChevronRight giữ nguyên bên ngoài */}
          <span className="flex size-5 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 transition-colors">
            <ChevronRight className="size-3" aria-hidden="true" />
          </span>
        </Link>
      ) : null}
    </div>
  );
}
