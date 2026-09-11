import type { ReactElement } from "react";

import { CardGridSection } from "@/components/shared/section-title/card-grid-section";
import { SplitContentSection } from "@/components/shared/section-title/split-content";
import { TextContentSection } from "@/components/shared/section-title/text-content-section";

import type { SectionTitleProps } from "./section-title/types";

export { SectionTitleGroupProps } from "./section-title/section-title-group";
export type {
  SectionTitleAlign,
  SectionTitleHeadingLevel,
  SectionTitleHorizonSplitProps,
  SectionTitleMore,
  SectionTitleMoreProps,
  SectionTitleOrientation,
  SectionTitleProps,
  SectionTitleSplitContentPosition,
  SectionTitleSplitProps,
  SectionTitleVerticalSplitProps,
} from "./section-title/types";

export function SectionTitle(props: SectionTitleProps): ReactElement {
  switch (props.content) {
    case "split":
      return <SplitContentSection {...props} />;
    case "text":
      return <TextContentSection {...props} />;
    case "imageList":
    default:
      return <CardGridSection {...props} />;
  }
}
