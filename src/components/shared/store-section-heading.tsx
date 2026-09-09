import type { ReactNode } from "react";
import clsx from "clsx";

type StoreSectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  centered?: boolean;
  divider?: boolean;
  className?: string;
};

export default function StoreSectionHeading({
  eyebrow,
  title,
  description,
  action,
  centered = false,
  divider = false,
  className,
}: StoreSectionHeadingProps) {
  const headingContent = (
    <div className={clsx("space-y-2", centered && "text-center")}>
      {eyebrow ? (
        <span className="type-eyebrow m-0 block text-neutral-500">
          {eyebrow}
        </span>
      ) : null}

      <h2
        className={clsx(
          "type-h2 m-0 text-neutral-950",
          centered && "text-center"
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={clsx(
            "type-prose m-0 text-base text-neutral-600",
            centered && "mx-auto max-w-2xl text-center"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );

  if (divider) {
    return (
      <div className={clsx("flex items-center gap-3 sm:gap-4", className)}>
        <div className="hidden h-px min-w-8 flex-1 bg-neutral-200 sm:block" />
        <div className="min-w-0 flex-1 sm:flex-initial">{headingContent}</div>
        <div className="hidden h-px min-w-8 flex-1 bg-neutral-200 sm:block" />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">{headingContent}</div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
