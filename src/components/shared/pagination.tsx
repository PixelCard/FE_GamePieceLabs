import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/utils/cn";

export type PaginationVariant = "default" | "simple";
export type PaginationAlign = "left" | "center" | "right";

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

interface PaginationProps {
  align: PaginationAlign;
  pagination: PaginationMeta;
  variant: PaginationVariant;
}

type VisiblePage = number | "ellipsis-start" | "ellipsis-end";

const paginationAlignClassNames: Record<PaginationAlign, string> = {
  left: "items-start",
  center: "items-center",
  right: "items-end",
};

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): VisiblePage[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis-end", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis-start",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ];
}

export function Pagination({ align, pagination, variant }: PaginationProps) {
  const {
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    hasNext,
    hasPrevious,
  } = pagination;
  const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const lastItem = Math.min(currentPage * pageSize, totalItems);
  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const summary = `Showing ${firstItem}-${lastItem} of ${totalItems} products`;

  if (variant === "simple") {
    return (
      <PaginationRoot
        aria-label="Product pagination"
        className={cn("flex-col gap-4", paginationAlignClassNames[align])}
      >
        <p className="text-sm text-neutral-600">{summary}</p>

        <PaginationContent className="gap-4">
          <PaginationItem>
            <PaginationPrevious
              href={`?page=${previousPage}`}
              text="Previous"
              aria-disabled={!hasPrevious}
              tabIndex={hasPrevious ? undefined : -1}
              className={cn(
                "rounded-full border border-neutral-200",
                !hasPrevious && "pointer-events-none text-neutral-400",
              )}
            />
          </PaginationItem>

          <PaginationItem>
            <span
              className="flex h-9 min-w-24 items-center justify-center px-3 text-sm font-medium text-neutral-700"
              aria-current="page"
            >
              Page {currentPage} of {totalPages}
            </span>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href={`?page=${nextPage}`}
              text="Next"
              aria-disabled={!hasNext}
              tabIndex={hasNext ? undefined : -1}
              className={cn(
                "rounded-full bg-neutral-950 text-white hover:bg-neutral-800 hover:text-white",
                !hasNext &&
                  "pointer-events-none bg-neutral-200 text-neutral-400",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    );
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <PaginationRoot
      aria-label="Product pagination"
      className={cn("flex-col gap-4", paginationAlignClassNames[align])}
    >
      <p className="text-sm text-neutral-600">{summary}</p>

      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            href={`?page=${previousPage}`}
            aria-disabled={!hasPrevious}
            tabIndex={hasPrevious ? undefined : -1}
            className={cn(
              !hasPrevious && "pointer-events-none text-neutral-400",
            )}
          />
        </PaginationItem>

        {visiblePages.map((page) => (
          <PaginationItem key={page}>
            {typeof page === "number" ? (
              <PaginationLink
                href={`?page=${page}`}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            ) : (
              <PaginationEllipsis />
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={`?page=${nextPage}`}
            aria-disabled={!hasNext}
            tabIndex={hasNext ? undefined : -1}
            className={cn(
              !hasNext && "pointer-events-none text-neutral-400",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationRoot>
  );
}
