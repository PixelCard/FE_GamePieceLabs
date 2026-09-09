import type { ReactElement } from "react";

import { CardImageTitleGrid } from "@/components/shared/card-image-title";
import { cn } from "@/utils/cn";

import { createSectionTitleId, SectionHeading } from "./section-heading";
import type { SectionTitleMoreProps } from "./types";

export function CardGridSection({
  title,
  more,
  align,
  orientation,
  topContent,
  bottomContent,
  children,
  className,
}: SectionTitleMoreProps): ReactElement {
  const titleId = createSectionTitleId(title);

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        "mx-auto w-full max-w-[1900px] px-4 sm:px-6 xl:px-[50px]",
        className,
      )}
    >
      <div className="mx-auto w-full sm:max-w-[620px] lg:max-w-[940px] xl:max-w-[1580px]">
        <SectionHeading
          title={title}
          titleId={titleId}
          more={more}
          align={align}
          orientation={orientation}
          topContent={topContent}
          bottomContent={bottomContent}
          className="mb-6 sm:mb-10"
        />

        <CardImageTitleGrid>{children}</CardImageTitleGrid>
      </div>
    </section>
  );
}
